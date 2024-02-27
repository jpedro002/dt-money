import { render } from '@testing-library/react'
import { TransactionsList } from '../TransactionsList'
import {
  Transaction,
  TransactionsContext,
  TransactionsContextData,
} from '@/contexts/transactionsContexts'

const transactions = [
  {
    id: '1',
    description: 'Transaction 1',
    transactionType: 'entrada',
    price: 10,
    category: 'Category 1',
    createdAt: '2022-01-01',
  },
  {
    id: '2',
    description: 'Transaction 2',
    transactionType: 'saida',
    price: 20,
    category: 'Category 2',
    createdAt: '2022-01-02',
  },
]

const setTransactionToEdit = vi.fn()
const changeModalState = vi.fn()

const renderTransactionsList = (transactions: Transaction[]) => {
  return render(
    <TransactionsContext.Provider
      value={
        {
          transactions: transactions || [],
          setTransactionToEdit,
          changeModalState,
        } as unknown as TransactionsContextData
      }
    >
      <TransactionsList />
    </TransactionsContext.Provider>,
  )
}

test('renders transactions correctly', () => {
  const { getByText } = renderTransactionsList(transactions)

  expect(getByText('Transaction 1')).toBeInTheDocument()
  expect(getByText('Transaction 2')).toBeInTheDocument()
})

test('renders transaction prices correctly and right colors', () => {
  const { getByText } = renderTransactionsList(transactions)

  expect(getByText('R$ 10,00')).toBeInTheDocument()
  expect(getByText('R$ 10,00')).toHaveClass('text-green-light')

  expect(getByText('- R$ 20,00')).toBeInTheDocument()
  expect(getByText('- R$ 20,00')).toHaveClass('text-red-default')
})

test('render a empyt arr', () => {
  const { getByTestId } = renderTransactionsList([])

  expect(getByTestId('transactions-list-container').hasChildNodes()).toBeFalsy()
})
