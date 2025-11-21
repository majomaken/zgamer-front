import { useFormik } from "formik";
import { GamerInput } from "../../ui/components/GamerInput";
import { GamerButton } from "../../ui/components/GamerButton";
import { useMemo, useState } from "react";
import { z } from "zod";
import { registerRequest } from "../services/authService";

export function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  console.log('isSubmitting', isSubmitting);
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
        email: z.email('Introduce un correo válido'),
        password: z
          .string()
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .regex(/[A-Z]/, 'Incluye al menos una letra mayúscula')
          .regex(/[0-9]/, 'Incluye al menos un número')
      }), 
    []
  )

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    // validate,
    onSubmit: async (values, actions) => {
      console.log('testOnsubmit', values);
      try {
        setStatusMessage(null);
        setError(null);
        await registerRequest(values);
        actions.resetForm();
        setStatusMessage('Cuenta creada.')
      } catch (submissionError) {
        console.error('Registration failed', submissionError);
        setError(submissionError);
        setStatusMessage(submissionError.message ?? 'No se pudo registrar, intenta de nuevo');
      } finally {
        actions.setSubmitting(false);
      }
    },
  })

  const { values, handleChange, handleBlur, errors, touched } = formik;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('values', values);
    formik.handleSubmit(values);
  }

  return (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <GamerInput 
              id="name"
              label="Nickname"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="ShadowSlayer"
              autoComplete="name"
              required
              error={touched.name && errors.name ? errors.name : undefined}
            />
            <GamerInput
              id="email"
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@gmail.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              required
              error={touched.email && errors.email ? errors.email : undefined}
            />
            <GamerInput
              id="password"
              label="Contraseña"
              type="password"
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
              required
              error={touched.password && errors.password ? errors.password : undefined}
            />
          </div>

          {error ? (
            <p className="rounded-lg border border-red-500/60 bg-red-950/50 px-4 py-3 text-sm text-red-200">{error.message}</p>
          ) : null}

          {statusMessage && !error && (
            <p className="rounded-lg border border-emerald-500/40 bg-emerald-900/10 px-4 py-3 text-sm text-emerald-100">{statusMessage}</p>
          )}

          <GamerButton
            type="submit"
            disabled={isSubmitting || formik.formSubmitting}
            className="w-full"
          >
            Crear Cuenta
          </GamerButton>
        </form>
  );
}
