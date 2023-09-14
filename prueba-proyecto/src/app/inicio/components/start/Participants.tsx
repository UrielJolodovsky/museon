import Image from 'next/image'
import React from 'react'
import Piramid from '@/../../public/assets/Piramid.png'
import { CldImage } from 'next-cloudinary'

const Participants = () => {
  return (
    <section className='w-[300px] h-[400px] flex justify-center items-center flex-row gap-1 container-participants '>
      <div className=' h-full lg:h-1/2 lg:w-full flex justify-center items-center'>
        <div className='w-full h-1/2 lg:w-[400px] lg:h-[300px] md:h-[250px] flex justify-end items-end md:order-2 md:flex md:justify-center md:items-center'>
          <CldImage src='PiramidIcon' width={0} height={0} alt={"Piramid"} className='w-[300px] h-[200px]' />
        </div>
      </div>
      <div className=' flex justify-center items-center flex-col gap-2 part-texts '>
        <h2 className='w-full font-extrabold text-center text-4xl md:text-2xl'>¿Quienes participan?</h2>
        <h4 className='w-1/2 text-center font-light text-xl lg:text-base'>Multiples museos de diferentes partes del mundo son partes de nuestra red.</h4>
      </div>
    </section>
  )
}
export default Participants