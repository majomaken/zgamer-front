import { useFormik } from "formik";
import { GamerButton } from "../../../ui/components/GamerButton";
import { GamerCard } from "../../../ui/components/GamerCard";
import { GamerInput } from "../../../ui/components/GamerInput";
import { GamerTextarea } from "../../../ui/components/GamerTextarea";
import { validateSchema } from "../../../shared/utils/valiateSchema";
import { postSchema } from "../schemas/postSchemas";
import { GamerLoader } from "../../../ui/components/GamerLoader";
import { useMemo, useState } from "react";
import { createPost } from "../services/postService";

export function PostPrivatePage() {
  const initialValues = { title: '', content: '' }
  const [statusMessage, setStatusMessage] = useState(null)
  const [error, setError] = useState(null)
  const validator = useMemo(() => validateSchema(postSchema), [])

  const formik = useFormik({
    initialValues,
    validate: validator,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: false,
    enableReinitialize: false,
    onSubmit: async (values, actions) => {
      const validationErrors = validator(values);
      if (Object.keys(validationErrors).length > 0) {
        actions.setErrors(validationErrors)
        actions.setTouched({
          title: true,
          content: true,
        })
        actions.setSubmitting(false)
        return
      }
      
      try {
        setError(null)
        await createPost(values)
        setStatusMessage('Post Creado correctamente.')
      } catch (error) {
        console.error(error)
        setError(error)
        setStatusMessage('No pudimos crear el post')
      } finally {
        actions.setSubmitting(false)
      }
    }
  })

  const { values, handleChange, handleBlur, errors, touched, isSubmitting } = formik

  return (
    <div className="space-y-6">
      <GamerCard 
        title="Panel Privado de Posts"
        subtitle="Lanza actualizaciones para tu equipo de publicaciones"
        className="text-left"
      >
        <form className="space-y-6" onSubmit={formik.handleSubmit} noValidate>
          <div className="space-y-4">
            <GamerInput
              id="title"
              label="Título"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ej. Plan de contenido"
              required
              error={touched.title && errors.title ? errors.title : undefined}
            />
            <GamerTextarea 
              id="content"
              label="Contenido"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Contenido del POST"
              required
              error={touched.content && errors.content ? errors.content : undefined}
            />
          </div>

          {statusMessage ? (
            <p className={`rounded-lg text-sm border ${error ? 'border-red-500/40 text-red-100' : 'bg-emerald-900/10 text-emerald-100'} px-4 py-3`}>{statusMessage}</p>
          ) : null}

          <GamerButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                  <GamerLoader size="md" label="Publicando..."/>
              </span>
            ) : (
              'Crear post privado'
            )}
          </GamerButton>
        </form>
      </GamerCard>
    </div>
  )
}