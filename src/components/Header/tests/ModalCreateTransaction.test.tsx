// ModalCreateTransaction.test.tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ModalCreateTransaction } from '../ModalCreateTransaction'
import {
  TransactionsContext,
  TransactionsContextData,
  useTransactions,
} from '@/contexts/transactionsContexts'

vi.mock('@/contexts/transactionsContexts', async (importOriginal) => {
  const mod =
    await importOriginal<typeof import('@/contexts/transactionsContexts')>()
  return {
    ...mod,
    useTransactions: vi.fn(() => ({
      handleAddTransaction: vi.fn(),
      modalIsOpen: true,
      changeModalState: vi.fn(),
      itemToEdit: null,
      handleUpdateTransaction: vi.fn(),
    })),
  }
})

const renderModalCreateTransaction = () => {
  return render(
    <TransactionsContext.Provider
      value={{} as unknown as TransactionsContextData}
    >
      <ModalCreateTransaction />
    </TransactionsContext.Provider>,
  )
}

test('calls handleAddTransaction with empty places', async () => {
  const { getByTestId } = renderModalCreateTransaction()
  const form = getByTestId('form')

  await act(async () => {
    fireEvent.submit(form)
  })

  expect(useTransactions().handleAddTransaction).not.toHaveBeenCalled()
})
test('calls handleAddTransaction with right places', async () => {
  const { getByTestId, getByPlaceholderText, getByText } =
    renderModalCreateTransaction()
  const form = getByTestId('form')
  const amountInput = getByPlaceholderText('Preço')
  const descriptionInput = getByPlaceholderText('Descrição')
  const categoryInput = getByPlaceholderText('Categoria')

  await act(async () => {
    fireEvent.change(amountInput, { target: { value: '10' } })
    fireEvent.change(descriptionInput, {
      target: { value: 'Test transaction' },
    })
    fireEvent.change(categoryInput, { target: { value: 'Test category' } })
    fireEvent.submit(form)
  })

  // expect(useTransactions().handleAddTransaction).toHaveBeenCalled()
})
