'use client'

import { NewTransactionFormInputs } from '@/components/Header/Modal'
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
  handleDeleteTransaction: (id: string) => void
}

const TransactionsContext = createContext({} as TransactionsContextData)

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const createNewTransaction = async (
    transactionInputs: NewTransactionFormInputs,
  ) => {
    const response = await api('/transactions', {
      method: 'POST',
      body: JSON.stringify({
        ...transactionInputs,
        createdAt: new Date().toISOString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    return data
  }

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
    const newTransaction = await createNewTransaction(transactionInputs)
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction])
  }
  const handleDeleteTransaction = (id: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id),
    )
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        handleAddTransaction,
        handleDeleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

const useTransactions = () => useContext(TransactionsContext)

export { TransactionsProvider, useTransactions }
