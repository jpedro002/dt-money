import Icon from '@/icons/Icons'

export default function HomePage() {
  return (
    <main className="wfull bg-gray-personalized-gray2 min-h-full">
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
                  shablau
                </span>
                <Icon name="arrow-up-circle" className="text-green-light " />
              </div>
              <strong className="text-gray-personalized-white text-[2rem] mt-3  ">
                R$ 17.400,00
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
                <Icon name="arrow-down-circle" className="text-red-dark" />
              </div>
              <strong className="text-gray-personalized-white text-[2rem] mt-3  ">
                R$ 17.400,00
              </strong>
            </div>
          </div>
          <div
            className="flex flex-col pl-8 pr-6 py-6 bg-green-dark rounded-lg
            min-w-[22rem]
          "
          >
            <div className="flex flex-col justify-between">
              <div className="flex justify-between">
                <span className="text-base text-gray-personalized-gray6 font-normal   ">
                  Total
                </span>
                <Icon name="dollar-sign" className="text-white" />
              </div>
              <strong className="text-gray-personalized-white text-[2rem] mt-3  ">
                R$ 17.400,00
              </strong>
            </div>
          </div>
        </div>
      </div>
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
          <Icon name="search" size={22} />
          <span className="text-base font-bold">Buscar</span>
        </button>
      </form>
      <table className="max-w-[70rem] mx-auto flex flex-col mt-6 gap-2 ">
        {Array.from({ length: 0 }, (_, i) => i + 1).map((_, index) => (
          <tr
            key={index}
            className="bg-gray-personalized-gray3 w-full flex gap-2 py-5 px-8
        rounded-lg
        "
          >
            <td className="w-full text-gray-personalized-gray6 text-base">
              Desenvolvimento de site {_}
            </td>
            <td className="min-w-[12.5rem] text-green-light text-base         ">
              R$ 12.000,00
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
    </main>
  )
}
