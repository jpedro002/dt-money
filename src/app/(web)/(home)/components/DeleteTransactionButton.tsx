import { useTransactions } from '@/contexts/transactionsContexts'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Trash } from 'lucide-react'
import { useState } from 'react'

export const DeleteTransactionButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const { handleDeleteTransaction } = useTransactions()

  const changeOpenState = () => setOpen((prev) => !prev)

  return (
    <AlertDialog.Root open={open} onOpenChange={changeOpenState}>
      <AlertDialog.Trigger asChild>
        <button
          data-testid="delete-button-trigger"
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
                data-testid="delete-button"
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
