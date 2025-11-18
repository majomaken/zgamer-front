import { useState } from "react";
import { GamerInput } from "../../ui/components/GamerInput";
import { GamerButton } from "../../ui/components/GamerButton";
import { loginRequest } from "../services/authService";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setIsSubmitting(true);
      const response = await loginRequest({ email, password });
      console.log(response);

      response.status === 'OK' ? setIsLoggedIn(true) : setIsLoggedIn(false);

    } catch (error) {
      setError({ message: error.message });
    } finally {
      setIsSubmitting(false);
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
          {error.message}
        </p>
      )}

      {isLoggedIn && (
        <p className="rounded-lg border border-green-500/60 bg-green-950/50 px-4 py-3 text-sm text-green-200">
          Inicio de sesión exitoso
        </p>
      )}

      <GamerButton type="submit" disabled={isSubmitting} >{isSubmitting ? 'Cargando...' : 'Iniciando Sesión'}</GamerButton>
    </form>
  );
}