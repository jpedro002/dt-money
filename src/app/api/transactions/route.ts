import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const transactions = await prisma.transaction.findMany()
  return NextResponse.json(transactions.reverse())
}
