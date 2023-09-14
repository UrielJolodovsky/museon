import Image from 'next/image'
import React from 'react'
import Piramid from '@/../../public/assets/Piramid.png'
import { CldImage } from 'next-cloudinary'

const Participants = () => {
  return (
    <section className='w-2/3 h-[400px] flex justify-center items-center flex-row gap-1 container-participants '>
      <div className='w-1/2 h-full lg:h-1/2 lg:w-full flex justify-center items-center'>
        <div className='w-full h-full flex justify-center items-center md:order-2 md:flex md:justify-center md:items-center'>
          <CldImage src='PiramidIcon' alt='PiramidImage' width={0} height={0} className='piramid-image' ></CldImage>
        </div>
      </div>
      <div className='w-1/2 flex justify-center items-center flex-col gap-2 part-texts '>
        <h2 className='w-full font-extrabold text-center text-4xl md:text-2xl'>¿Quienes participan?</h2>
        <h4 className='w-4/5 text-center font-light text-xl lg:text-base'>Multiples museos de diferentes partes del mundo son partes de nuestra red.</h4>
      </div>
    </section>
  )
}
export default Participants