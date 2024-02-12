import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  if (!transactions) {
    return NextResponse.json({ data: 'Not found', status: 404 })
  }
  return NextResponse.json({ data: transactions, status: 200 })
}
