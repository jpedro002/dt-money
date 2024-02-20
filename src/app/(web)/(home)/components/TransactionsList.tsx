'use client'

import { useTransactions } from '@/contexts/transactionsContexts'
import { priceFormatter } from '@/utils/formatPrice'
import clsx from 'clsx'
import { ArrowBigRight, CalendarDays, Pen, Trash } from 'lucide-react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

const DeleteTransaction = ({ id }: { id: string }) => {
  const { handleDeleteTransaction } = useTransactions()

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className="text-gray-personalized-gray5 p-2 rounded-lg border border-transparent
                 hover:text-red-default hover:border-red-default
                 transition-colors duration-300 ease-in-out
                 "
        >
          <Trash size={18} />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content
          className="data-[state=open]:animate-contentShow fixed
         top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%]
          translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none
          shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
           "
        >
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Voçê tem absoluta certeza?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            Essa ação não pode ser desfeita. Isso irá excluir permanentemente a
            sua conta e remover os seus dados dos nossos servidores.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button
                className="text-black bg-gray-personalized-gray6
              hover:bg-gray-personalized-gray4/45 focus:shadow-gray-700 inline-flex
              h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium
               leading-none outline-none focus:shadow-[0_0_0_2px]"
              >
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => handleDeleteTransaction(id)}
                className="text-red-600 bg-red-200 hover:bg-red-300/75
                 inline-flex h-[35px] items-center justify-center
                 rounded-[4px] px-[15px] font-medium leading-none outline-none
                 focus:shadow-[0_0_0_2px]"
              >
                Deletar
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export const TransactionsList = () => {
  const { transactions, setTransactionToEdit, changeModalState } =
    useTransactions()
  const dateFormatter = new Intl.DateTimeFormat('pt-BR')

  return (
    <div className="max-w-[70rem] mx-auto flex flex-col mt-6 gap-2 px-4 lg:px-0 pb-8  ">
      <ul className="flex justify-evenly flex-wrap gap-4">
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
                <DeleteTransaction id={transaction.id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// md:w-full md:max-w-full md:flex-row md:gap-2
// md:py-5 md:px-8 md:rounded-lg
