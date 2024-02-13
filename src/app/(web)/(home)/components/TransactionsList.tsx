'use client'

import { useTransactions } from '@/contexts/transactionsContexts'
import { priceFormatter } from '@/utils/formatPrice'
import clsx from 'clsx'
import { ArrowBigRight, CalendarDays } from 'lucide-react'

export const TransactionsList = () => {
  const { transactions } = useTransactions()
  const dateFormatter = new Intl.DateTimeFormat('pt-BR')

  return (
    <div className="max-w-[70rem] mx-auto flex flex-col mt-6 gap-2 px-4 lg:px-0 pb-8  ">
      <ul className="flex justify-evenly flex-wrap gap-4">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="bg-gray-personalized-gray3
            min-w-[326px] w-full  flex flex-col p-5 rounded-lg
            md:w-full md:max-w-full md:flex-row md:gap-2
            md:py-5 md:px-8 md:rounded-lg
              "
          >
            <span className="w-full text-gray-personalized-gray6 text-base">
              {transaction.description}
            </span>
            <span
              className={clsx(
                `min-w-[12.5rem] text-base font-bold `,
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
              <div className="sm:min-w-[5.75rem] min-w-[6.5rem] text-gray-personalized-gray5 text-base flex flex-row items-center       ">
                <CalendarDays className="md:hidden mr-0.5" size={16} />
                {dateFormatter.format(new Date(transaction.createdAt))}
              </div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
