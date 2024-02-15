import Image from 'next/image'
import { Modal } from './Modal'

// TODO: quando voltar para componetizar o button, adcionar hover e active

export function Header() {
  return (
    <header className="min-h-[13.25rem] w-full bg-gray-personalized-gray1">
      <div className="max-w-[70rem] mx-auto mt-[2.78rem] flex justify-between items-center px-4 lg:px-0      ">
        <div className="flex space-x-4 items-center">
          <Image alt="" src="/IgniteSimbol.svg" width={40} height={38} />
          <h2 className="text-[1.6rem] font-bold text-gray-personalized-gray7">
            DT Money
          </h2>
        </div>
        {/* <Modal /> */}
      </div>
    </header>
  )
}
