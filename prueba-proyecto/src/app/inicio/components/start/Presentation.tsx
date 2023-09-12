"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CldImage, CldVideoPlayer } from 'next-cloudinary'


const Presentation = () => {
  const router = useRouter()
  const { data: sessionData } = useSession()



  const handleLogin = () => {
    router.push('/login')
  }

  const handleCollections = () => {
    router.push('/Colecciones')
  }


  return (
    <section className='w-full h-[500px] flex justify-center items-center flex-row md:flex-col'>
      <div className='w-3/5 h-[300px] flex flex-col justify-center items-center gap-6'>
        <div className='w-full h-[100px] justify-center items-center flex flex-col gap-3'>
          <h1 className=' w-full text-center font-semibold text-5xl'>¡Bienvenido a Museon!</h1>
          <h3 className='w-8/12 text-center text-lg font-medium leading-normal'>Disfruta de la experiencia de visitar museos desde la comodidad de tu casa</h3>
        </div>
        <div className='w-full h-[60px] justify-center items-center flex flex-row gap-14'>
          <button onClick={handleCollections} className='w-[180px] h-full rounded-full bg-black hover:scale-95 transition border-4 group'>
            <h1 className='text-xl text-white transition'>Colecciones</h1>
          </button>
          {sessionData?.user ? ("") : (
            <button onClick={handleLogin} className='w-[180px] h-full hover:scale-95 transition border-4 group rounded-full'>
              <h1 className='text-xl font-semibold '>Log in</h1>
            </button>
          )
          }
        </div>
      </div>
      <div className='w-2/5 h-full flex justify-center items-center'>
        <CldImage src={'Logo_Negro'} width={0} height={0} alt='Tecnología' className='w-[250px] h-[300px]'></CldImage>
      </div>
    </section>
  )
}

export default Presentation