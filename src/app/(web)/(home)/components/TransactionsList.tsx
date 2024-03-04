'use client'

import { useTransactions } from '@/contexts/transactionsContexts'
import { priceFormatter } from '@/utils/formatPrice'
import clsx from 'clsx'
import { ArrowBigRight, CalendarDays, Pen } from 'lucide-react'
import { DeleteTransactionButton } from './DeleteTransactionButton'

export const TransactionsList = () => {
  const { transactions, setTransactionToEdit, changeModalState } =
    useTransactions()
  const dateFormatter = new Intl.DateTimeFormat('pt-BR')

  return (
    <div className="max-w-[70rem] mx-auto flex flex-col mt-6 gap-2 px-4 lg:px-0 pb-8  ">
      <ul
        data-testid="transactions-list-container"
        className="flex justify-evenly flex-wrap gap-4"
      >
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="bg-gray-personalized-gray3
            min-w-[326px] w-full  flex flex-row justify-between p-5 rounded-lg

              "
          >
            <div className="flex flex-col flex-1 md:flex-row md:items-center">
              <span className="w-full text-gray-personalized-gray6 text-base">
                {transaction.description}
              </span>
              <span
                className={clsx(
                  `min-w-[11.5rem] text-base font-bold `,
                  transaction.transactionType === 'entrada'
                    ? ' text-green-light'
                    : 'text-red-default',
                )}
              >
                {transaction.transactionType === 'entrada' ? '' : '- '}
                {priceFormatter.format(transaction.price)}
              </span>
              <span className="flex justify-between md:gap-2 md:justify-start">
                <div className="w-full md:min-w-[15rem] text-gray-personalized-gray5 text-base flex flex-row items-center     ">
                  <ArrowBigRight className="md:hidden mr-0.5" size={16} />
                  {transaction.category}
                </div>
              </span>
            </div>

            <div className="min-w-fit flex flex-col gap-3 md:flex-row md:items-center   ">
              <div className="sm:min-w-[5.75rem] min-w-[6.5rem] text-gray-personalized-gray5 text-base flex flex-row items-center       ">
                <CalendarDays className="md:hidden mr-0.5" size={16} />
                {dateFormatter.format(new Date(transaction.createdAt))}
              </div>
              <div className="flex justify-around gap-1">
                <button
                  onClick={() => {
                    changeModalState()
                    setTransactionToEdit(transaction)
                  }}
                  className="text-gray-personalized-gray5 p-2 rounded-lg border border-transparent
                 hover:text-gray-personalized-gray6 hover:border-gray-personalized-gray6
                 transition-colors duration-300 ease-in-out
                 "
                >
                  <Pen size={18} />
                </button>
                <DeleteTransactionButton id={transaction.id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
