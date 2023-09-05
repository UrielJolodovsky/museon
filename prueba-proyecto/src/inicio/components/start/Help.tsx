import Image from 'next/image'
import React from 'react'
import Foto3 from '@/../../public/assets/Foto3.png'


const Help = () => {
  return (
    <section className='w-full h-[300px] lg:h-[350px] flex justify-center items-center flex-col'>
      <div className='w-full flex justify-center items-center flex-row md:flex-col'>
        <div className='w-1/3 lg:w-1/2 flex justify-center items-center flex-col gap-2 pt-20'>
          <h2 className='font-extrabold text-center text-4xl'>¿Como funciona?</h2>
          <h5 className='w-5/6 h-max text-center font-light text-lg'>La institución que asi lo desea, escanea con su celular y lo sube a la plataforma. Desde aquel momento los usuarios lo pueden disfrutar</h5>
        </div>
        <div className='flex justify-center items-center w-1/3 lg:w-1/2 h-full'>
          <div className='w-[400px] h-[400px] lg:w-[300px] lg:h-[300px]'>
            <Image
              className='w-full h-full'
              src={Foto3}
              alt='Modelos 3D'
              height={400}
              width={400}></Image>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Help