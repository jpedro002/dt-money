'use client'

import { useTransactions } from '@/contexts/transactionsContexts'
import { Search } from 'lucide-react'
import { useState } from 'react'

export const FormSeachTransaction = () => {
  const [query, setQuery] = useState('')

  const { transactions, getTransactionsByQueryCtx } = useTransactions()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      getTransactionsByQueryCtx(query)
    } else getTransactionsByQueryCtx('')
  }

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-[70rem] mx-auto flex mt-6 md:mt-16 gap-3 px-4 lg:px-0 flex-col  md:flex-row  "
    >
      <div className="flex justify-between md:hidden">
        <label
          htmlFor="search"
          className="text-gray-personalized-gray6 text-lg "
        >
          Transações
        </label>

        <span className="text-gray-personalized-gray5 text-base">
          {transactions.length} itens
        </span>
      </div>
      <div className="flex w-full gap-2">
        <input
          name="search"
          id="search"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-personalized-gray1 p-4 rounded-lg w-full
            text-gray-personalized-gray5 text-base
            placeholder:text-gray-personalized-gray5
            "
          placeholder="Busque uma transação "
        />
        <button
          className="bg-transparent border-2 border-green-light p-4
          md:px-8 md:py-[0.88rem] rounded-lg text-green-light flex justify-between
          items-center  active:bg-green-light active:text-white
          "
        >
          <Search size={22} />
          <span className="text-base font-bold hidden  md:block  ">Buscar</span>
        </button>
      </div>
    </form>
  )
}
