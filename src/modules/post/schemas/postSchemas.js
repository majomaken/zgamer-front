import { z } from 'zod'

export const postSchema = z.object({
  title: z
    .string()
    .min(3, 'El título debe tener al menos 3 caracteres.')
    .max(120, 'Hasta 120 caracteres.'),
  content: z
    .string()
    .min(10, 'Describe el contenido a detalle de (mínimo 10 caracteres).')
})