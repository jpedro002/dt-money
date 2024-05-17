import { ReactNode } from 'react'
import { Toaster } from 'sonner'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen h-screen flex-center bg-gray-personalized-gray2 ">
      {children}
      <Toaster richColors />
    </main>
  )
}

export default AuthLayout
