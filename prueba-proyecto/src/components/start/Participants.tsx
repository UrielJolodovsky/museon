import Image from 'next/image'
import React from 'react'
import Piramid from '../../../public/assets/Piramid.png'

const Participants = () => {
  return (
    <section className='w-full h-[400px] flex justify-center items-center flex-row gap-1'>
      <div className='w-1/3 h-2/3 relative left-20'>
        <Image
          src={Piramid}
          alt='Icon 3D'
          className='w-full h-full'
        ></Image>
      </div>
      <div className='w-2/3 flex justify-center items-center flex-col gap-2'>
        <h2 className='font-extrabold text-center text-4xl'>¿Quienes participan?</h2>
        <h4 className='w-3/4 text-center font-light text-lg'>Multiples museos de diferentes partes del mundo son partes de nuestra red.</h4>
      </div>
    </section>
  )
}
export default Participants