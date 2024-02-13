import z from 'zod'

export const createTransactionSchema = z.object({
  description: z.string().min(1, 'campo obrigatorio'),
  price: z.number({
    required_error: 'campo obrigatorio',
    invalid_type_error: 'use apenas números ou ponto para casas decimais',
  }),
  category: z.string().min(1, 'campo obrigatorio'),
  transactionType: z.string().min(1, 'campo obrigatorio'),
})

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export const loginSchema = z.object({
  email: z.string().min(1, 'campo obrigatorio').email('email inválido'),
  password: z.string().min(0, 'campo obrigatorio'),
})

export const registerSchema = z
  .object({
    name: z.string().min(1, 'campo obrigatorio'),
    email: z.string().min(1, 'campo obrigatorio').email('email inválido'),
    password: z.string().min(1, 'campo obrigatorio'),
    retypePassword: z.string().min(1, 'campo obrigatorio'),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: 'As senhas não coincidem',
    path: ['retypePassword'],
  })
