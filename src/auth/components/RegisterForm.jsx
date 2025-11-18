import { Form, Formik } from "formik";
import { GamerInput } from "../../ui/components/GamerInput";
import { GamerButton } from "../../ui/components/GamerButton";
import { useState } from "react";

export function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  let error = { message: 'Test error' };
  // let error = null;
  let statusMessage = "Test status message";

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  return (
    <Formik initialValues={initialValues}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting: formSubmitting}) => (
        <Form className="space-y-6">
          <div className="space-y-4">
            <GamerInput 
              id="username"
              label="Nickname"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="ShadowSlayer"
              autoComplete="username"
              required
              error={touched.username && errors.username ? errors.username : undefined}
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
            disabled={isSubmitting || formSubmitting}
            className="w-full"
          >
            Crear Cuenta
          </GamerButton>
        </Form>
      )}
    </Formik>
  );
}
