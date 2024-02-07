import Image from 'next/image'

export function Header() {
  return (
    <header className="min-h-[13.25rem] w-full bg-gray-personalized-gray1">
      <div className="max-w-[70rem] mx-auto mt-[2.78rem] flex justify-between items-center     ">
        <div className="flex space-x-4 items-center">
          <Image alt="" src="/IgniteSimbol.svg" width={40} height={38} />
          <h2 className="text-[1.6rem] font-bold text-gray-personalized-gray7">
            DT Money
          </h2>
        </div>
        <button
          className="px-5 py-3 text-gray-personalized-white
        bg-green-default flex-center rounded-lg text-base font-bold"
        >
          Nova transação
        </button>
      </div>
    </header>
  )
}
