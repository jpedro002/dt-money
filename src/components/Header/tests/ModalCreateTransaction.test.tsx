import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ModalCreateTransaction } from '../ModalCreateTransaction'
import {
  TransactionsContext,
  TransactionsContextData,
} from '@/contexts/transactionsContexts'

const handleAddTransaction = vi.fn()
const modalIsOpen = false
const changeModalState = vi.fn()
const itemToEdit = null
const handleUpdateTransaction = vi.fn()

const renderComponent = () => {
  return render(
    <TransactionsContext.Provider
      value={
        {
          handleAddTransaction,
          modalIsOpen,
          changeModalState,
          itemToEdit,
          handleUpdateTransaction,
        } as unknown as TransactionsContextData
      }
    >
      <ModalCreateTransaction />
    </TransactionsContext.Provider>,
  )
}

test('renders a message', () => {
  const { getByText } = renderComponent()

  expect(getByText('Nova transação')).toBeInTheDocument()
})

test('open modal when button is clicked', () => {
  const { getByText } = renderComponent()

  const button = getByText('Nova transação')
  fireEvent.click(button)

  expect(changeModalState).toHaveBeenCalled()
})

test('handles adding a transaction', () => {
  const handleSubmit = vi.fn((data) => console.log(data))
  const onSubmit = vi.fn(handleSubmit)

  const mockSetCurrentTransaction = {
    setCurrentTransaction: (transaction: 'entrada' | 'saida') => {},
  }

  const spyCurrentTransaction = vi.spyOn(
    mockSetCurrentTransaction,
    'setCurrentTransaction',
  )

  const { getByText, getByPlaceholderText, getByTestId, debug } = render(
    <TransactionsContext.Provider
      value={
        {
          handleAddTransaction,
          modalIsOpen: true,
          changeModalState,
          itemToEdit,
          handleUpdateTransaction,
        } as unknown as TransactionsContextData
      }
    >
      <ModalCreateTransaction />
    </TransactionsContext.Provider>,
  )

  debug()

  const amountInput = getByPlaceholderText('Preço')
  fireEvent.change(amountInput, { target: { value: '10' } })

  const descriptionInput = getByPlaceholderText('Descrição')
  fireEvent.change(descriptionInput, { target: { value: 'Test transaction' } })

  const categoryInput = getByPlaceholderText('Categoria')
  fireEvent.change(categoryInput, { target: { value: 'Test category' } })

  const buttonIncome = getByText('Entrada')
  fireEvent.click(buttonIncome)

  expect(spyCurrentTransaction).toHaveBeenCalledWith('entrada')

  // const submitButton = getByText('Cadastrar')
  // fireEvent.click(submitButton)

  // const form = getByTestId('form')
  // fireEvent.submit(form)

  // expect(handleSubmit).toHaveBeenCalledWith({
  //   description: 'Test transaction',
  //   price: 10,
  //   category: 'Test category',
  //   transactionType: 'entrada',
  // })
})
