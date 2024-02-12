'use server'

import { z } from 'zod'
import { createTransactionSchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'

type Inputs = z.infer<typeof createTransactionSchema>

export async function createTransaction(data: Inputs) {
  const result = createTransactionSchema.safeParse(data)

  if (result.success) {
    const newTransaction = await prisma.transaction.create({
      data: {
        category: result.data.category,
        description: result.data.description,
        price: result.data.price,
        transactionType: result.data.transactionType,
      },
    })

    return { success: true, data: newTransaction }
  }

  if (result.error) {
    return { success: false, error: result.error.format() }
  }
}
