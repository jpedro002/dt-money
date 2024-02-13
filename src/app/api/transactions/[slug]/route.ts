import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import * as jose from 'jose'

export const GET = async (
  _: Request,
  { params }: { params: { slug: string } },
) => {
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
              startsWith: params.slug,
            },
          },
        },
      },
    })
    if (seachedTransaction?.Transaction.length) {
      return NextResponse.json({
        data: seachedTransaction.Transaction,
        status: 200,
      })
    } else {
      return NextResponse.json({ data: 'Not found', status: 404 })
    }
  }
}
