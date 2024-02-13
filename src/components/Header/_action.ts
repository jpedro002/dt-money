'use server'

import { z } from 'zod'
import { createTransactionSchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'
import AuthService from '@/modules/auth/actions/authService'
import { cookies } from 'next/headers'

type FormInputs = z.infer<typeof createTransactionSchema>

export async function createTransaction(data: FormInputs) {
  const session = cookies().get('session')
  const decodeJWT = await AuthService.openSessionToken(session?.value as string)
  const result = createTransactionSchema.safeParse(data)

  if (result.success) {
    const newTransaction = await prisma.transaction.create({
      data: {
        category: result.data.category,
        description: result.data.description,
        price: result.data.price,
        transactionType: result.data.transactionType,
        userId: decodeJWT.sub as string,
      },
    })

    return { success: true, data: newTransaction }
  }

  if (result.error) {
    return { success: false, error: result.error.format() }
  }
}
