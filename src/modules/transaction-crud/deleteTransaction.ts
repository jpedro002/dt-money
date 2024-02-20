'use server'

import { prisma } from '@/lib/prisma'

export const deleteTransaction = async (id: string) => {
  try {
    await prisma.transaction.delete({
      where: {
        id,
      },
    })

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
