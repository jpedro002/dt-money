'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { registerSchema } from '@/lib/validations'
import { createAccount } from '@/modules/auth/actions/authAction'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type RegisterForm = z.infer<typeof registerSchema>

// TODO:SHOW SERVER ERRORS

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    const res = await createAccount(data)
    if (res?.success) {
      router.replace('/')
    } else {
      switch (res?.errorType) {
        case 'email':
          toast.error(res.errorMessage)
          break
        case 'server': {
          toast.error(res.errorMessage)
          break
        }
        default:
          toast.error('Erro ao criar conta')
      }
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 ">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="p-4 bg-gray-personalized-gray1 w-full
          text-gray-personalized-gray5 text-base font-normal rounded-lg shadow-md
           focus:outline-none focus:ring-2 focus:ring-green-light"
          placeholder="name"
          {...register('name')}
        />
        {errors.name?.message && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="p-4 bg-gray-personalized-gray1 w-full
          text-gray-personalized-gray5 text-base font-normal rounded-lg shadow-md
           focus:outline-none focus:ring-2 focus:ring-green-light"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email?.message && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="p-4 bg-gray-personalized-gray1 w-full
          text-gray-personalized-gray5 text-base font-normal rounded-lg shadow-md
           focus:outline-none focus:ring-2 focus:ring-green-light"
          placeholder="senha"
          {...register('password')}
        />
        {errors.password?.message && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="p-4 bg-gray-personalized-gray1 w-full
          text-gray-personalized-gray5 text-base font-normal rounded-lg shadow-md
           focus:outline-none focus:ring-2 focus:ring-green-light"
          placeholder="senha"
          {...register('retypePassword')}
        />
        {errors.retypePassword?.message && (
          <span className="text-red-500">{errors.retypePassword.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="p-4 bg-green-light w-full text-white text-base font-normal rounded-lg
         shadow-md focus:outline-none focus:ring-2 focus:ring-green-light"
      >
        criar conta
      </button>
    </form>
  )
}

export default RegisterPage
