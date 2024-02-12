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
