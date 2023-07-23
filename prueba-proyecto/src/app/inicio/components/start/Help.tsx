import Image from 'next/image'
import React from 'react'
import Foto3 from '@/../../public/assets/Foto3.png'


const Help = () => {
  return (
    <section className='w-full h-[500px] flex justify-start items-center flex-col'>
      <div className='w-full flex justify-center items-center flex-row'>
        <div className='w-1/2 flex justify-center items-center flex-col gap-2 pt-20'>
          <h2 className='font-extrabold text-center text-4xl'>¿Como funciona?</h2>
          <h5 className='w-5/6 h-max text-center font-light text-lg'>La institución que asi lo desea, escanea con su celular y lo sube a la plataforma. Desde aquel momento los usuarios lo pueden disfrutar</h5>
        </div>
        <Image
          className='w-1/2'
          src={Foto3}
          alt='Modelos 3D'
          height={300}
          width={300}></Image>
      </div>
    </section>
  )
}

export default Help