import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen h-screen flex-center bg-gray-personalized-gray2 ">
      {children}
    </main>
  )
}

export default AuthLayout
