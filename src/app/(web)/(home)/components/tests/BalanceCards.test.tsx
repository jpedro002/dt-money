import { render } from '@testing-library/react'
import { BalanceCards } from '../BalanceCards'
import {
  Transaction,
  TransactionsContext,
  TransactionsContextData,
} from '@/contexts/transactionsContexts'

const transactions: Transaction[] = [
  {
    transactionType: 'entrada',
    price: 10,
    category: 'teste',
    description: 'teste',
    id: 'teste',
    createdAt: 'teste',
  },
  {
    transactionType: 'entrada',
    price: 20,
    category: 'teste',
    description: 'teste',
    id: 'teste',
    createdAt: 'teste',
  },
  {
    transactionType: 'saida',
    price: 5,
    category: 'teste',
    description: 'teste',
    id: 'teste',
    createdAt: 'teste',
  },
]

const renderBalanceCards = (transactions: Transaction[]) => {
  return render(
    <TransactionsContext.Provider
      value={
        {
          transactions: transactions || [],
        } as unknown as TransactionsContextData
      }
    >
      <BalanceCards />
    </TransactionsContext.Provider>,
  )
}

test('calculates balance correctly for transactions with entrada', () => {
  const { getByText } = renderBalanceCards(transactions)

  expect(getByText('R$ 30,00')).toBeInTheDocument()
  expect(getByText('R$ 5,00')).toBeInTheDocument()
  expect(getByText('R$ 25,00')).toBeInTheDocument()
})

test('calculates balance correctly for empty transactions', () => {
  const { getByTestId } = renderBalanceCards([])

  const balanceEntrada = getByTestId('balance-entrada')
  const balanceSaida = getByTestId('balance-saida')
  const balanceTotal = getByTestId('balance-total')

  expect(balanceEntrada).toHaveTextContent('R$ 0,00')
  expect(balanceSaida).toHaveTextContent('R$ 0,00')
  expect(balanceTotal).toHaveTextContent('R$ 0,00')
})
