import { render, fireEvent } from '@testing-library/react'
import { FormSeachTransaction } from '../FormSeachTransaction'
import {
  Transaction,
  TransactionsContext,
  TransactionsContextData,
} from '@/contexts/transactionsContexts'

const getTransactionsByQueryCtx = vi.fn()

const renderBalanceCards = (transactions: Transaction[]) => {
  return render(
    <TransactionsContext.Provider
      value={
        {
          getTransactionsByQueryCtx,
          transactions: transactions || [],
        } as unknown as TransactionsContextData
      }
    >
      <FormSeachTransaction />
    </TransactionsContext.Provider>,
  )
}

describe('FormSeachTransaction', () => {
  test('renders the form correctly', () => {
    const { getByLabelText, getByPlaceholderText, debug } = renderBalanceCards(
      [],
    )

    debug()

    expect(getByLabelText('Transações')).toBeInTheDocument()
    expect(getByPlaceholderText('Busque uma transação')).toBeInTheDocument()
  })

  test('calls getTransactionsByQueryCtx with the correct query ', () => {
    const { getByLabelText, getByRole } = renderBalanceCards([])
    const searchInput = getByLabelText('Transações')
    const searchButton = getByRole('button', { name: 'Buscar' })

    fireEvent.change(searchInput, { target: { value: 'test' } })
    fireEvent.click(searchButton)

    expect(getTransactionsByQueryCtx).toHaveBeenCalledWith('test')
  })

  test('calls getTransactionsByQueryCtx with an empty query', () => {
    const { getByLabelText, getByRole } = renderBalanceCards([])
    const searchInput = getByLabelText('Transações')
    const searchButton = getByRole('button')

    fireEvent.click(searchButton)

    expect(getTransactionsByQueryCtx).toHaveBeenCalledWith('')
  })
})
