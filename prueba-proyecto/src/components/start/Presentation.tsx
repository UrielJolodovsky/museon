import Image from 'next/image'
import React from 'react'
import Foto2 from '../../../public/assets/Foto2.png'

const Presentation = () => {
  return (
    <section className='w-full h-[500px] flex justify-center items-center flex-row'>
          <div className='w-full flex flex-col justify-center items-center gap-6'>
            <div className='w-10/12 h-full justify-center items-center flex flex-col gap-3'>
              <h1 className=' w-full text-center font-semibold text-7xl'>¡Bienvenido a Courbet!</h1>
              <h3 className='w-8/12 text-center text-2xl font-medium leading-normal'>Disfruta de la experiencia de visitar museos desde la comodidad de tu casa</h3>
            </div>
          </div>
          <div className='w-2/6 h-full flex justify-center items-center'>
            <Image src={Foto2} alt='logo' width={163.168} height={385}></Image>
          </div>
        </section>
  )
}

export default Presentation