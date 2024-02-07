import Icon from '@/icons/Icons'

export default function first() {
  return (
    <main className="wfull bg-gray-personalized-gray2 min-h-full">
      <div className="max-w-[70rem] mx-auto flex flex-col">
        <div className="flex gap-8 -mt-24  ">
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
                <Icon name="arrow-up-circle" />
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
                  shablau
                </span>
                <Icon name="arrow-up-circle" />
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
                  shablau
                </span>
                <Icon name="arrow-up-circle" />
              </div>
              <strong className="text-gray-personalized-white text-[2rem] mt-3  ">
                R$ 17.400,00
              </strong>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
