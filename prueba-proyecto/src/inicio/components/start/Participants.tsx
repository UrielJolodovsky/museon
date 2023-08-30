import Image from 'next/image'
import React from 'react'
import Piramid from '@/../../public/assets/Piramid.png'
import { CldImage } from 'next-cloudinary'

const Participants = () => {
  return (
    <section className='w-full h-[400px] flex justify-center items-center flex-row gap-1 md:flex-col'>
      <div className='w-1/3 h-full flex justify-center'>
      <div className='w-[500px] h-[400px] flex justify-end items-end md:order-2 md:flex md:justify-center md:items-center'>
        <CldImage src='PiramidIcon'  width={0} height={0} alt={"Piramid"} className='w-full h-full' />
      </div>
      </div>
      <div className='w-1/3 flex justify-center items-center flex-col gap-2 md:order-1 '>
        <h2 className='font-extrabold text-center text-4xl'>¿Quienes participan?</h2>
        <h4 className='w-3/4 text-center font-light text-xl'>Multiples museos de diferentes partes del mundo son partes de nuestra red.</h4>
      </div>
    </section>
  )
}
export default Participants