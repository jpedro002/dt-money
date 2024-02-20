'use server'

import { prisma } from '@/lib/prisma'
import * as jose from 'jose'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const getTransactionsByQuery = async (query: string) => {
  const crrJWT = cookies().get('session')
  if (crrJWT) {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

    const { payload } = await jose.jwtVerify(crrJWT.value, secret)

    const seachedTransaction = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        Transaction: {
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            description: {
              startsWith: query,
            },
          },
        },
      },
    })

    if (seachedTransaction?.Transaction.length) {
      return {
        data: seachedTransaction.Transaction,
        status: 200,
      }
    } else {
      return { data: [], status: 404 }
    }
  }
}
