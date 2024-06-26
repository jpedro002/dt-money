'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTransactions } from '@/contexts/transactionsContexts'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTransactionSchema } from '@/lib/validations'
import z from 'zod'

import * as Dialog from './index'
import { ArrowDownCircle, ArrowUpCircle, X } from 'lucide-react'
import clsx from 'clsx'

export type NewTransactionFormInputs = z.infer<typeof createTransactionSchema>

export const Modal = () => {
  const {
    handleAddTransaction,
    modalIsOpen,
    changeModalState,
    itemToEdit,
    handleUpdateTransaction,
  } = useTransactions()
  const [currentTransaction, setCurrentTransaction] = useState<
    'entrada' | 'saida' | ''
  >('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: '',
      price: undefined,
      category: '',
      transactionType: '',
    },
  })

  const clearForm = () => {
    clearErrors()
    reset()
    setCurrentTransaction('')
  }

  useEffect(() => {
    if (itemToEdit) {
      setCurrentTransaction(itemToEdit.transactionType as 'entrada' | 'saida')
      setValue('description', itemToEdit.description || '')
      setValue('price', itemToEdit.price)
      setValue('category', itemToEdit.category || '')
      setValue('transactionType', itemToEdit.transactionType || '')
    }
  }, [itemToEdit, setValue])

  const onSubmit = handleSubmit(async (data) => {
    if (itemToEdit) {
      handleUpdateTransaction(data, itemToEdit.id)
    } else {
      handleAddTransaction({ ...data })
    }
    clearForm()
  })

  return (
    <Dialog.Root open={modalIsOpen} onOpenChange={changeModalState}>
      <Dialog.Trigger onClick={clearForm} asChild>
        <button
          className="px-5 py-3 text-gray-personalized-white
            bg-green-default flex-center rounded-lg text-base font-bold"
        >
          Nova transação
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" data-[state=open]:animate-overlayShow bg-black/75 fixed inset-0" />
        <Dialog.Content
          className="h-fit sm:data-[state=open]:animate-contentShow fixed rounded-lg bottom-0
        sm:top-[50%] left-[50%] translate-x-[-50%] w-full sm:min-w-[33.4375rem]  sm:w-min
        sm:translate-y-[-50%] bg-gray-personalized-gray2 min-h-[33rem] sm:px-12 px-6 md:pb-10  pt-6
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
         focus:outline-none"
        >
          <Dialog.Close asChild>
            <button
              className="text-gray-personalized-gray5 hover:bg-gray-300 focus:shadow-gray-700
               absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none
                items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
          <Dialog.Title className="text-gray-personalized-gray7 mb-8 text-2xl font-bold">
            Nova transação
          </Dialog.Title>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 ">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                className="p-4 bg-gray-personalized-gray1 w-full
                text-gray-personalized-gray5 text-base font-normal rounded-lg     "
                placeholder="Descrição"
                {...register('description')}
              />
              {errors.description?.message && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                className="p-4 bg-gray-personalized-gray1 w-full
                text-gray-personalized-gray5 text-base font-normal rounded-lg     "
                placeholder="Preço"
                {...register('price', {
                  valueAsNumber: true,
                })}
              />
              {errors.price?.message && (
                <span className="text-red-500">{errors.price.message}</span>
              )}
            </div>
            <div className="flex flex-col ">
              <input
                type="text"
                className="p-4 bg-gray-personalized-gray1 w-full
              text-gray-personalized-gray5 text-base font-normal rounded-lg     "
                placeholder="Categoria"
                {...register('category')}
              />
              {errors.category?.message && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-4 mt-2  mb-6  ">
              <div className="flex w-full gap-4">
                <label className=" w-full  ">
                  <input
                    type="radio"
                    value="entrada"
                    className="hidden"
                    {...register('transactionType')}
                  />
                  <div
                    className={clsx(
                      `flex-center gap-2 bg-gray-personalized-gray3  py-4 px-6
                      w-full rounded-lg`,
                      currentTransaction === 'entrada'
                        ? 'bg-green-dark text-white'
                        : '',
                    )}
                    onClick={() => setCurrentTransaction('entrada')}
                  >
                    <ArrowUpCircle
                      className={clsx(
                        'text-green-light',
                        currentTransaction === 'entrada' ? 'text-white' : '',
                      )}
                    />
                    <span
                      className={clsx(
                        'text-base',
                        currentTransaction === 'entrada'
                          ? 'text-white'
                          : 'text-gray-personalized-gray6',
                      )}
                    >
                      Entrada
                    </span>
                  </div>
                </label>
                <label className=" w-full  ">
                  <input
                    {...register('transactionType')}
                    type="radio"
                    value="saida"
                    className="hidden"
                  />
                  <div
                    className={clsx(
                      `flex-center gap-2 bg-gray-personalized-gray3  py-4 px-6
                    w-full rounded-lg`,
                      currentTransaction === 'saida'
                        ? 'bg-red-dark text-white'
                        : '',
                    )}
                    onClick={() => setCurrentTransaction('saida')}
                  >
                    <ArrowDownCircle
                      className={clsx(
                        'text-red-dark',
                        currentTransaction === 'saida' ? 'text-white' : '',
                      )}
                    />
                    <span
                      className={clsx(
                        'text-base',
                        currentTransaction === 'saida'
                          ? 'text-white'
                          : 'text-gray-personalized-gray6',
                      )}
                    >
                      Saída
                    </span>
                  </div>
                </label>
              </div>
              {errors.category?.message && (
                <span className="text-red-500">campo obrigatorio</span>
              )}
            </div>

            <button
              className="bg-green-default flex-center leading-none
            focus:shadow-[0_0_0_2px] focus:outline-none  w-full px-8 py-4
            text-base text-white rounded-lg
            "
            >
              Cadastrar
            </button>
            <Dialog.Close asChild></Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
