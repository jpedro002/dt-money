'use client'

import * as Dialog from '@radix-ui/react-Dialog'
import { ArrowDownCircle, ArrowUpCircle, X } from 'lucide-react'

// TODO FAZER A LOGICA DO SELECT QUANDO DE MUDAR A COR DO INPUT SELECIONADO

export const Modal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
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
          className=" data-[state=open]:animate-contentShow fixed rounded-lg
        top-[50%] left-[50%] translate-x-[-50%] min-w-[33.4375rem]
        translate-y-[-50%] bg-gray-personalized-gray2 min-h-[33rem] px-12 pb-10 pt-12
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
          <form action="" className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              className="p-4 bg-gray-personalized-gray1 w-full
              text-gray-personalized-gray5 text-base font-normal rounded-lg     "
              placeholder="Descrição"
            />
            <input
              type="text"
              className="p-4 bg-gray-personalized-gray1 w-full
              text-gray-personalized-gray5 text-base font-normal rounded-lg     "
              placeholder="Preço"
            />
            <input
              type="text"
              className="p-4 bg-gray-personalized-gray1 w-full
            text-gray-personalized-gray5 text-base font-normal rounded-lg     "
              placeholder="Categoria"
            />
          </form>
          <div className="flex gap-4 mb-10 justify-stretch">
            <label className="w-full">
              <input type="radio" value="cartão de débito" className="hidden" />

              <button
                className="flex-center gap-2 bg-gray-personalized-gray3
                py-4 px-6 w-full rounded-lg "
                onClick={() => console.log('oi')}
              >
                <ArrowUpCircle className="text-green-light " />
                <span className="text-base text-gray-personalized-gray6   ">
                  Entrada
                </span>
              </button>
            </label>
            <label className="w-full">
              <input type="radio" value="cartão de débito" className="hidden" />

              <button
                className="flex-center gap-2 bg-gray-personalized-gray3
              py-4 px-6 w-full rounded-lg "
              >
                <ArrowDownCircle className="text-red-dark" />
                <span className="text-base text-gray-personalized-gray6   ">
                  Saída
                </span>
              </button>
            </label>
          </div>
          <Dialog.Close asChild>
            <button
              className="bg-green-default flex-center leading-none
            focus:shadow-[0_0_0_2px] focus:outline-none  w-full px-8 py-4
            text-base text-white rounded-lg
            "
            >
              Cadastrar
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
