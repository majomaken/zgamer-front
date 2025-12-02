import { useState } from "react";
import { GamerInput } from "../../../ui/components/GamerInput";
import { GamerButton } from "../../../ui/components/GamerButton";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isSubmitting, error, resetError } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      resetError();
      await login({ email, password });
      setStatusMessage('Inicio de sesión exitoso');
      setTimeout(() => navigate('/dashboard'), 1000);
      
    } catch (error) {
      setStatusMessage(error);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <GamerInput
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="ejemplo@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        <GamerInput
          id="email"
          label="Contraseña"
          type="password"
          placeholder="********"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/60 bg-red-950/50 px-4 py-3 text-sm text-red-200">
          {Object.values(error).join(', ')}
        </p>
      )}

      {statusMessage && !error && (
        <p className="rounded-lg border border-green-500/60 bg-green-950/50 px-4 py-3 text-sm text-green-200">
          {statusMessage}
        </p>
      )}

      <GamerButton type="submit" disabled={isSubmitting} >{isSubmitting ? 'Cargando...' : 'Iniciando Sesión'}</GamerButton>
    </form>
  );
}