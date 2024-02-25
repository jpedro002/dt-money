import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ModalCreateTransaction } from '../ModalCreateTransaction'
import { TransactionsProvider } from '@/contexts/transactionsContexts'

test('renders a message', () => {
  const { getByText } = render(
    <TransactionsProvider>
      <ModalCreateTransaction />
    </TransactionsProvider>,
  )
  expect(getByText('Hello, world!')).toBeInTheDocument()
})

test('handles adding a transaction', () => {
  const { getByLabelText, getByText } = render(
    <TransactionsProvider>
      <ModalCreateTransaction />
    </TransactionsProvider>,
  )

  // Simulate user input
  const amountInput = getByLabelText('Amount')
  fireEvent.change(amountInput, { target: { value: '10' } })

  const descriptionInput = getByLabelText('Description')
  fireEvent.change(descriptionInput, { target: { value: 'Test transaction' } })

  // Simulate button click
  const addButton = getByText('Add Transaction')
  fireEvent.click(addButton)

  // Assert that the transaction was added
  // You can add your own assertions here based on your implementation
})

test('handles updating a transaction', () => {
  const { getByLabelText, getByText } = render(
    <TransactionsProvider>
      <ModalCreateTransaction />
    </TransactionsProvider>,
  )

  // Simulate user input
  const amountInput = getByLabelText('Amount')
  fireEvent.change(amountInput, { target: { value: '20' } })

  const descriptionInput = getByLabelText('Description')
  fireEvent.change(descriptionInput, {
    target: { value: 'Updated transaction' },
  })

  // Simulate button click
  const updateButton = getByText('Update Transaction')
  fireEvent.click(updateButton)

  // Assert that the transaction was updated
  // You can add your own assertions here based on your implementation
})
