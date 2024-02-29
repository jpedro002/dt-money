import { render, screen, fireEvent, getByTestId } from '@testing-library/react'
import { DeleteTransactionButton } from '../DeleteTransactionButton'
import {
  TransactionsContext,
  TransactionsContextData,
} from '@/contexts/transactionsContexts'

const handleDeleteTransaction = vi.fn()

const renderDeleteTransactionButton = (id: string) => {
  return render(
    <TransactionsContext.Provider
      value={
        {
          handleDeleteTransaction,
        } as unknown as TransactionsContextData
      }
    >
      <DeleteTransactionButton id={id} />
    </TransactionsContext.Provider>,
  )
}

test('renders the delete button and test open change', () => {
  const { getByTestId } = renderDeleteTransactionButton('1')

  const deleteButtonTrigger = getByTestId('delete-button-trigger')
  fireEvent.click(deleteButtonTrigger)

  expect(deleteButtonTrigger.getAttribute('data-state')).toEqual('open')
})

test('calls handleDeleteTransaction when delete button is clicked', () => {
  const { getByTestId } = renderDeleteTransactionButton('1')

  const deleteButtonTrigger = getByTestId('delete-button-trigger')
  fireEvent.click(deleteButtonTrigger)

  const deleteButton = getByTestId('delete-button')

  expect(deleteButton).toBeInTheDocument()

  fireEvent.click(deleteButton)

  expect(handleDeleteTransaction).toHaveBeenCalledWith('1')
})
