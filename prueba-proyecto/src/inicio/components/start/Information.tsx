import Image from 'next/image'
import React from 'react'
import Foto1 from '@/../../public/assets/Foto1.png'
import { CldImage } from 'next-cloudinary'


const Information = () => {
  return (
    <section className='w-full h-[400px] flex justify-center items-center flex-row md:flex-col'>
      <div className='w-1/2 h-full flex flex-col justify-center items-center gap-2'>
        <h1 className='w-3/4 text-center text-4xl font-extrabold'>¿De que se trata?</h1>
        <p className=' w-2/3 text-center text-xl '>Es una plataforma web de accesibilidad universal donde usuarios van a poder visitar museos y/o galerias artisticas de todo el mundo desde la comodidad de su hogar</p>
      </div>
      <div className='w-[400px] h-[300px] flex justify-start items-center'>
        {/* <Image src={Foto1} alt='Tecnología' className='w-full h-full'></Image> */}
        <CldImage src={'Foto1_Landing'} width={0} height={0} alt='Tecnología' className='w-full h-full'></CldImage>
      </div>
    </section>
  )
}

export default Information