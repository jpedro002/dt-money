'use client'

import { useTransactions } from '@/contexts/transactionsContexts'
import { priceFormatter } from '@/utils/formatPrice'
import clsx from 'clsx'

export const TransactionsList = () => {
  const { transactions } = useTransactions()

  return (
    <table className="max-w-[70rem] mx-auto flex flex-col mt-6 gap-2 ">
      {transactions.map((transaction) => (
        <tr
          key={transaction.id}
          className="bg-gray-personalized-gray3 w-full flex gap-2 py-5 px-8
            rounded-lg
            "
        >
          <td className="w-full text-gray-personalized-gray6 text-base">
            {transaction.description}
          </td>
          <td
            className={clsx(
              `min-w-[12.5rem] text-base `,
              transaction.transactionType === 'entrada'
                ? ' text-green-light'
                : 'text-red-default',
            )}
          >
            {transaction.transactionType === 'entrada' ? '' : '- '}
            {priceFormatter.format(transaction.price)}
          </td>
          <td className="min-w-[15rem]   text-gray-personalized-gray6 text-base      ">
            Venda
          </td>
          <td className="min-w-[5.75rem] text-gray-personalized-gray6 text-base        ">
            13/04/2022
          </td>
        </tr>
      ))}
    </table>
  )
}
