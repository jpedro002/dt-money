import { Header } from '@/components/Header/Header'
import { ReactNode } from 'react'
import { TransactionsProvider } from '@/contexts/transactionsContexts'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid min-h-screen w-full grid-rows-[min-content_1fr]
    grid-cols-1
    "
    >
      <TransactionsProvider>
        <Header />
        {children}
      </TransactionsProvider>
    </div>
  )
}
