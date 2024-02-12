// Importe as dependências necessárias
import { log } from 'console'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

// Defina a função de rota
export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    // Aqui você pode adicionar a lógica para criar o usuário
    // Acessar os dados do corpo da requisição usando req.body
    // Retornar a resposta adequada usando res.status e res.send
    const body = await req.json()
    log(body)

    try {
      userSchema.parse(body)
    } catch (error) {
      return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 })
    }

    return NextResponse.json(
      { message: 'Usuário criado com sucesso' },
      { status: 200 },
    )
  } else {
    return NextResponse.json(
      { message: 'Método não permitido' },
      { status: 405 },
    )
  }
}
