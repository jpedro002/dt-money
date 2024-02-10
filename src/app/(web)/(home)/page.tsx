import { BalanceCards } from './components/BalanceCards'
import { TransactionsList } from './components/TransactionsList'
import { FormSeachTransaction } from './components/FormSeachTransaction'

export default function HomePage() {
  return (
    <main className="wfull bg-gray-personalized-gray2 min-h-full">
      <BalanceCards />
      <FormSeachTransaction />
      <TransactionsList />
    </main>
  )
}
