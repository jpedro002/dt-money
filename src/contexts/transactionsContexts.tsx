'use client'

import { NewTransactionFormInputs } from '@/components/Header/Modal'
import { createTransaction } from '@/components/Header/_action'
import { api } from '@/services/api'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

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
}

const TransactionsContext = createContext({} as TransactionsContextData)

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

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

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        handleAddTransaction,
        getTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

const useTransactions = () => useContext(TransactionsContext)

export { TransactionsProvider, useTransactions }
