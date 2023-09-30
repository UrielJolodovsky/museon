"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CldImage, CldVideoPlayer } from 'next-cloudinary'


const Presentation = () => {
  const router = useRouter()
  const { data: sessionData } = useSession()



  const handleEvents = () => {
    router.push('/eventos')
  }

  const handleCollections = () => {
    router.push('/colecciones')
  }


  return (
    <section className='w-full h-[500px] lg:w-2/3 flex justify-center items-center md:flex-row flex-col  '>
      <div className='w-full lg:w-2/3 h-1/3 lg:h-full flex flex-col justify-center items-center gap-4 lg:gap-6 px-4'>
        <div className='w-full h-[100px] justify-center items-center flex flex-col gap-3'>
          <h1 className=' w-full text-center font-semibold text-2xl lg:text-4xl '>¡Bienvenido a Museon!</h1>
          <h3 className='w-10/12 lg:w-full text-center text-sm font-medium leading-normal '>Disfruta de la experiencia de visitar museos desde la comodidad de tu casa</h3>
        </div>
        <div className='w-full h-[60px] justify-center items-center flex flex-row gap-6 '>
          <button onClick={handleCollections} className='w-[130px] lg:w-[180px] h-full rounded-full bg-black hover:scale-95 transition border-4 group'>
            <h1 className='text-base lg:text-lg text-white transition'>Colecciones &gt;</h1>
          </button>
          <button onClick={handleEvents} className='w-[130px] lg:w-[180px] h-full hover:scale-95 transition border-4 group rounded-full'>
            <h1 className='text-base lg:text-lg font-semibold '>Eventos &gt; </h1>
          </button>
        </div>
      </div>
      <div className='w-full h-1/2 lg:w-1/2 flex justify-center items-center'>
        <CldImage src={'Logo_Negro'} width={0} height={0} alt='Tecnología' className=' w-[200px] h-[230px]'></CldImage>
      </div>
    </section>
  )
}

export default Presentation