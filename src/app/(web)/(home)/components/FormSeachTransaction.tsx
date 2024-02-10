import { Search } from 'lucide-react'

export const FormSeachTransaction = () => {
  return (
    <form action="" className="max-w-[70rem] mx-auto flex mt-16 gap-4  ">
      <input
        type="text"
        className="bg-gray-personalized-gray1 p-4 rounded-lg w-full
          text-gray-personalized-gray5 text-base
          placeholder:text-gray-personalized-gray5
          "
        placeholder="Busque uma transação "
      />
      <button
        className="bg-transparent border-2 border-green-light
        px-8 py-[0.88rem] rounded-lg text-green-light flex justify-between
        items-center
        "
      >
        <Search size={22} />
        <span className="text-base font-bold">Buscar</span>
      </button>
    </form>
  )
}
