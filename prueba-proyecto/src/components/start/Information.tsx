import Image from 'next/image'
import React from 'react'
import Foto1 from '../../../public/assets/Foto1.png'


const Information = () => {
  return (
    <section className='w-full h-[400px] flex justify-center items-center flex-row'>
        <div className='w-10/12 flex flex-col justify-center items-start gap-4'>
          <h1 className='w-3/4 text-start text-4xl'>¿De que se trata?</h1>
          <p className=' w-3/4 text-start text-lg'>Es una plataforma web de accesibilidad universal donde usuarios van a poder visitar museos y/o galerias artisticas de todo el mundo desde la comodidad de su hogar</p>
        </div>
        <div className='w-4/12 flex justify-center items-center'>
          <Image src={Foto1} alt='Tecnología' height={350} width={350}></Image>
        </div>
    </section>
  )
}

export default Information