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
    <section className='w-2/3 h-[500px] flex justify-center items-center flex-row md:flex-col'>
      <div className='w-1/2 h-[400px] flex flex-col justify-center items-center gap-6 ml-10 container-pres'>
        <div className='w-full h-[100px] justify-center items-center flex flex-col gap-3'>
          <h1 className=' w-full text-center font-semibold text-5xl lg:text-4xl title-pres'>¡Bienvenido a Museon!</h1>
          <h3 className='w-8/12 lg:w-full text-center text-lg font-medium leading-normal des-pres'>Disfruta de la experiencia de visitar museos desde la comodidad de tu casa</h3>
        </div>
        <div className='w-full h-[60px] justify-center items-center flex flex-row gap-14 mt-2 cont-buttons-pres'>
          <button onClick={handleCollections} className='w-[180px] h-full rounded-full bg-black hover:scale-95 transition border-4 group'>
            <h1 className='text-xl text-white transition'>Colecciones &gt;</h1>
          </button>
          <button onClick={handleEvents} className='w-[180px] h-full hover:scale-95 transition border-4 group rounded-full'>
            <h1 className='text-xl font-semibold '>Eventos &gt; </h1>
          </button>
        </div>
      </div>
      <div className='w-2/5 h-full flex justify-center items-center mr-28 cont-pres-image'>
        <CldImage src={'Logo_Negro'} width={0} height={0} alt='Tecnología' className='pres-image w-[275px] h-[300px]'></CldImage>
      </div>
    </section>
  )
}

export default Presentation