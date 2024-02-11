'use client'

import { useTransactions } from '@/contexts/transactionsContexts'
import { priceFormatter } from '@/utils/formatPrice'
import clsx from 'clsx'
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'
import { useMemo } from 'react'

export const BalanceCards = () => {
  const { transactions } = useTransactions()

  const BALANCE = useMemo(() => {
    return transactions.reduce(
      (acc, crr) => {
        if (crr.transactionType === 'entrada') {
          acc.entrada += crr.price
          acc.total += crr.price
        } else {
          acc.saida += crr.price
          acc.total -= crr.price
        }
        return acc
      },
      {
        entrada: 0,
        saida: 0,
        total: 0,
      },
    )
  }, [transactions])

  return (
    <div className="max-w-[70rem] mx-auto flex flex-col">
      <div className="flex gap-8 -mt-[4.5rem]  ">
        <div
          className="flex flex-col pl-8 pr-6 py-6 bg-gray-personalized-gray4 rounded-lg
            min-w-[22rem]
          "
        >
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="text-base text-gray-personalized-gray6 font-normal   ">
                Entradas
              </span>
              <ArrowUpCircle className="text-green-light " />
            </div>
            <strong className="text-gray-personalized-white text-[2rem] mt-3  ">
              {priceFormatter.format(BALANCE.entrada)}
            </strong>
          </div>
        </div>
        <div
          className="flex flex-col pl-8 pr-6 py-6 bg-gray-personalized-gray4 rounded-lg
            min-w-[22rem]
          "
        >
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="text-base text-gray-personalized-gray6 font-normal   ">
                Saídas
              </span>
              <ArrowDownCircle className="text-red-dark" />
            </div>
            <strong className="text-gray-personalized-white text-[2rem] mt-3  ">
              {priceFormatter.format(BALANCE.saida)}
            </strong>
          </div>
        </div>
        <div
          className={clsx(
            `flex flex-col pl-8 pr-6 py-6  rounded-lg
            min-w-[22rem]`,
            BALANCE.total >= 0 ? 'bg-green-dark' : 'bg-red-dark',
          )}
        >
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="text-base text-gray-personalized-gray6 font-normal   ">
                Total
              </span>
              <DollarSign className="text-white" />
            </div>
            <strong className="text-gray-personalized-white text-[2rem] mt-3  ">
              {priceFormatter.format(BALANCE.total)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  )
}
