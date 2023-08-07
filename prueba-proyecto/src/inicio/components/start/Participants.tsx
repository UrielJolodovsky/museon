import Image from 'next/image'
import React from 'react'
import Piramid from '@/../../public/assets/Piramid.png'
import { CldImage } from 'next-cloudinary'

const Participants = () => {
  return (
    <section className='w-full h-[400px] flex justify-center items-center flex-row gap-1'>
      <div className='w-[655px] h-[492px] relative left-20'>
        <CldImage src='PiramidIcon'  width={655} height={492} alt={"Piramid"} className='w-full h-full' />
      </div>
      <div className='w-2/3 flex justify-center items-center flex-col gap-2'>
        <h2 className='font-extrabold text-center text-4xl'>¿Quienes participan?</h2>
        <h4 className='w-3/4 text-center font-light text-lg'>Multiples museos de diferentes partes del mundo son partes de nuestra red.</h4>
      </div>
    </section>
  )
}
export default Participants