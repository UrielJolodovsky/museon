import Image from 'next/image'
import React from 'react'
import Foto3 from '@/../../public/assets/Foto3.png'


const Help = () => {
  return (
    <section className='w-full h-[400px] md:h-[200px] flex justify-center items-center flex-col pt-10'>
      <div className='w-full md:w-2/3 flex justify-center items-center flex-col md:flex-row md:gap-2'>
        <div className='w-full h-1/2 md:w-1/2 md:h-full flex justify-center items-center flex-col gap-2 px-8 md:px-0'>
          <h2 className='font-extrabold text-center text-xl'>¿Como funciona?</h2>
          <h5 className='w-full text-center text-sm'>La institución que asi lo desea, escanea con su celular y lo sube a la plataforma. Desde aquel momento los usuarios lo pueden disfrutar</h5>
        </div>
        <div className='w-full h-1/3 md:h-full md:w-1/2 flex justify-center items-center overflow-hidden'>
          <Image
            className='w-[300px] h-[280px]'
            src={Foto3}
            alt='Modelos 3D'
            height={0}
            width={0}></Image>
        </div>
      </div>
    </section>
  )
}

export default Help