import Image from 'next/image'
import React from 'react'
import Foto1 from '@/../../public/assets/Foto1.png'
import { CldImage } from 'next-cloudinary'


const Information = () => {
  return (
    <section className='w-full h-[300px] lg:h-[450px] md:h-[450px] flex justify-center items-center flex-row lg:flex-col'>
      <div className='flex justify-center items-center w-full h-full lg:flex-col'>
        <div className='w-1/3 lg:w-full md:w-full lg:h-1/3 h-full flex flex-col justify-center items-center gap-2'>
          <h1 className='w-full text-center lg:text-2xl text-4xl font-extrabold'>¿De que se trata?</h1>
          <p className='w-11/12 text-center lg:text-base lg:w-3/4 text-xl '>Es una plataforma web de accesibilidad universal donde usuarios van a poder visitar museos y/o galerias artisticas de todo el mundo desde la comodidad de su hogar</p>
        </div>
        <div className='w-1/3 h-full flex justify-center items-center info-image-cont'>
          <CldImage src={'Foto1_Landing'} width={0} height={0} alt='Tecnología' className='w-[400px] h-[300px] '></CldImage>
        </div>
      </div>
    </section>
  )
}

export default Information