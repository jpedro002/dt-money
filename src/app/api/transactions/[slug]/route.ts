import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (
  _: Request,
  { params }: { params: { slug: string } },
) => {
  const seachedTransaction = await prisma.transaction.findMany({
    where: {
      description: {
        startsWith: params.slug,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (seachedTransaction.length) {
    return NextResponse.json({
      data: seachedTransaction,
      status: 200,
    })
  } else {
    return NextResponse.json({ data: 'Not found', status: 404 })
  }
}
