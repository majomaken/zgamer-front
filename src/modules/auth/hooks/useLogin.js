import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";

export function useLogin() {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = useCallback(
    async (credentials) => {
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await login(credentials);
        return response
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setIsSubmitting(false);
      }
    },
    [login]
  )

  return {
    login: handleLogin,
    isSubmitting,
    error,
    resetError: () => setError(null),
  }
}