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
}

const TransactionsContext = createContext({} as TransactionsContextData)

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const getTransactions = async () => {
    const response = await api(`/transactions`)
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  const handleAddTransaction = async (
    transactionInputs: NewTransactionFormInputs,
  ) => {
    const newTransaction = await createTransaction(transactionInputs)
    console.log(newTransaction)

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
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

const useTransactions = () => useContext(TransactionsContext)

export { TransactionsProvider, useTransactions }
