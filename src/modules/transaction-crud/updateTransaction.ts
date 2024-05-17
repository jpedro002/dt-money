'use server'

import { NewTransactionFormInputs } from '@/components/Header/Modal'
import { prisma } from '@/lib/prisma'

export const updateTransaction = async (
  inputs: NewTransactionFormInputs,
  id: string,
) => {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        category: inputs.category,
        description: inputs.description,
        price: inputs.price,
        transactionType: inputs.transactionType,
      },
    })

    return { success: true, data: updatedTransaction }
  } catch (error) {
    return { success: false }
  }
}
