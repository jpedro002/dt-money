'use client'

import { NewTransactionFormInputs } from '@/components/Header/Modal'
import { createTransaction } from '@/modules/transaction-crud/createTransaction'
import { deleteTransaction } from '@/modules/transaction-crud/deleteTransaction'
import { updateTransaction } from '@/modules/transaction-crud/updateTransaction'
import { api } from '@/services/api'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'

export interface Transaction extends NewTransactionFormInputs {
  id: string
  createdAt: string
}

interface TransactionsContextData {
  transactions: Transaction[]
  handleAddTransaction: (transactionInputs: NewTransactionFormInputs) => void
  getTransactions: ({
    query,
    queryToFilter,
  }: {
    query?: string
    queryToFilter: boolean
  }) => void
  handleDeleteTransaction: (id: string) => void
  modalIsOpen: boolean
  changeModalState: () => void
  itemToEdit: Transaction | null
  setTransactionToEdit: (transaction: Transaction) => void
  handleUpdateTransaction: (
    inputs: NewTransactionFormInputs,
    id: string,
  ) => void
}

const TransactionsContext = createContext({} as TransactionsContextData)

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<Transaction | null>(null)

  const getTransactions = async ({
    query,
    queryToFilter,
  }: {
    query?: string
    queryToFilter: boolean
  }) => {
    if (queryToFilter) {
      const response = await api(`/transactions/${query}`)
      const data = await response.json()

      if (data.status !== 404 && data.data) {
        return setTransactions(data.data)
      } else return setTransactions([])
    } else {
      const response = await api(`/transactions`)
      const data = await response.json()

      if (data.status !== 404 && data.data) {
        return setTransactions(data.data)
      } else return setTransactions([])
    }
  }

  useEffect(() => {
    getTransactions({ query: '', queryToFilter: false })
  }, [])

  const handleAddTransaction = async (
    transactionInputs: NewTransactionFormInputs,
  ) => {
    const newTransaction = await createTransaction(transactionInputs)

    if (newTransaction?.success && newTransaction.data) {
      toast.success('Event has been created')

      return setTransactions((prevTransactions) => [
        ...prevTransactions,
        {
          ...newTransaction.data,
          createdAt: newTransaction.data.createdAt.toString(),
        },
      ])
    } else {
      toast.error('not possible to create this event')
    }
  }

  const handleDeleteTransaction = async (id: string) => {
    const response = await deleteTransaction(id)
    if (response.success) {
      toast.success('Event has been created')
      return setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id),
      )
    } else {
      toast.error('not possible to delete this event')
    }
  }

  const changeModalState = () => {
    setModalIsOpen((prev) => !prev)
    setItemToEdit(null)
  }

  const setTransactionToEdit = (transaction: Transaction) => {
    setItemToEdit({ ...transaction })
  }

  const handleUpdateTransaction = async (
    inputs: NewTransactionFormInputs,
    id: string,
  ) => {
    const { success, data } = await updateTransaction(inputs, id)

    if (success && data) {
      setTransactions((prevTransactions) =>
        prevTransactions.map((prevTransaction) => {
          if (prevTransaction.id === data.id) {
            return { ...data, createdAt: data.createdAt.toString() }
          }
          return prevTransaction
        }),
      )
      toast.success('Event has been updated')
    } else {
      toast.error('not possible to update this event')
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        handleAddTransaction,
        getTransactions,
        handleDeleteTransaction,
        modalIsOpen,
        changeModalState,
        itemToEdit,
        setTransactionToEdit,
        handleUpdateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

const useTransactions = () => useContext(TransactionsContext)

export { TransactionsProvider, useTransactions }
