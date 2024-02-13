import { prisma } from '@/lib/prisma'
import * as jose from 'jose'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const crrJWT = cookies().get('session')
  if (crrJWT) {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
    const { payload } = await jose.jwtVerify(crrJWT.value, secret)
    const transactions = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        Transaction: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
    if (transactions && transactions.Transaction) {
      return NextResponse.json({ data: transactions.Transaction, status: 200 })
    } else {
      return NextResponse.json({ data: 'Not found', status: 404 })
    }
  }
}
