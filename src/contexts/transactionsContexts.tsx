'use client'

import { NewTransactionFormInputs } from '@/components/Header/Modal'
import { createTransaction } from '@/components/Header/_action'
import { deleteTransaction } from '@/modules/transaction-crud/deleteTransaction'
import { api } from '@/services/api'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'

interface Transaction extends NewTransactionFormInputs {
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
}

const TransactionsContext = createContext({} as TransactionsContextData)

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

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
      return setTransactions((prevTransactions) => [
        ...prevTransactions,
        {
          ...newTransaction.data,
          createdAt: newTransaction.data.createdAt.toString(),
        },
      ])
    }
  }

  const handleDeleteTransaction = async (id: string) => {
    const response = await deleteTransaction(id)
    if (response.success) {
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id),
      )
      toast.success('Event has been created')
    } else {
      toast.error('not possible to delete this event')
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        handleAddTransaction,
        getTransactions,
        handleDeleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

const useTransactions = () => useContext(TransactionsContext)

export { TransactionsProvider, useTransactions }
