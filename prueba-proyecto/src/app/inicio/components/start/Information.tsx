import Image from 'next/image'
import React from 'react'
import Foto1 from '@/../../public/assets/Foto1.png'
import { CldImage } from 'next-cloudinary'


const Information = () => {
  return (
    <section className='w-full h-[500px] md:h-[400px] lg:h-[300px] flex justify-center items-center lg:flex-row flex-col overflow-hidden gap-5'>
      <div className='flex justify-center items-center w-full md:w-2/3 h-4/5 flex-col lg:flex-row gap-4 md:gap-10 '>
        <div className='w-full h-1/2 flex lg:w-1/2 flex-col justify-center items-center gap-2'>
          <h1 className='w-full text-center lg:text-2xl text-2xl font-extrabold'>¿De que se trata?</h1>
          <p className='w-10/12 text-center text-sm '>Es una plataforma web de accesibilidad universal donde usuarios van a poder visitar museos y/o galerias artisticas de todo el mundo desde la comodidad de su hogar</p>
        </div>
        <div className='w-full md:w-1/2 h-1/3 flex justify-center items-center ml-6 '>
          <CldImage src={'Foto1_Landing'} width={0} height={0} alt='Tecnología' className='w-[250px] h-[200px] '></CldImage>
        </div>
      </div>
    </section>
  )
}

export default Information