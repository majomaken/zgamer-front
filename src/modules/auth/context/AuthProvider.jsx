import { useCallback, useMemo, useState } from "react";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../../../constants";
import { loginRequest, registerRequest } from "../services/authService";
import { AuthContext } from "./AuthContext";

function getClientStorage() {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage;
}

function readStoredAuth() {
  const storage = getClientStorage();
  if (!storage) {
    return { token: null, user: null }
  }
  
  const token = storage.getItem(TOKEN_STORAGE_KEY)
  const rawUser = storage.getItem(USER_STORAGE_KEY)

  if (!token || !rawUser) {
    return { token: null, user: null }
  }

  try {
    const user = JSON.parse(rawUser);
    return { token, user }
  } catch (error) {
    storage.removeItem(TOKEN_STORAGE_KEY);
    storage.removeItem(USER_STORAGE_KEY);
    console.error('Error al parsear el usuario almacenado:', error);
    return { token: null, user: null};
  }
}

export function AuthProvider({ children }) {
  const initialAuth = readStoredAuth();
  const [token, setToken] = useState(initialAuth.token);
  const [user, setUser] = useState(initialAuth.user)
  const [status, setStatus] = useState('')

  const persistAuth = useCallback((nextToken, nextUser) => {
    const storage = getClientStorage();
    setToken(nextToken);
    setUser(nextUser);

    if (!storage) {
      return;
    }

    if (nextToken && nextUser) {
      storage.setItem(TOKEN_STORAGE_KEY, nextToken);
      storage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      storage.removeItem(TOKEN_STORAGE_KEY);
      storage.removeItem(USER_STORAGE_KEY);
    }
  }, [])

  const login = useCallback(async (credentials) => {
    setStatus('loading');
    try {
      const data = await loginRequest(credentials);
      if(!data?.token) {
        throw new Error('Token no fue encontrado');
      }

      persistAuth(data.token, data.user ?? null);
      setStatus('authenticated')
      return data;
    } catch (error) {
      console.log('Error en el provider:', error)
      setStatus('error')
      throw error;
    }
  }, [persistAuth])

  const register = useCallback(
    async (payload) => {
      try {
        const data = await registerRequest(payload);
        if (data?.token) {
          persistAuth(data.token, data.user ?? null);
          setStatus('authenticated');
        } else {
          setStatus('registered');
        }

        return data;
      } catch (error) {
        setStatus('error')
        throw error;
      }
    },
    [persistAuth],
  )

  const logout = useCallback(() => {
    persistAuth(null, null);
    setStatus('idle');
  }, [persistAuth])

  const value = useMemo(() => ({
    token,
    user,
    status,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  }), [login, token, user, status, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}