import React from 'react'
import { CldImage } from 'next-cloudinary'

const Participants = () => {
  return (
    <section className='w-2/3 h-[200px] flex justify-start items-center flex-col md:flex-row gap-2 '>
      <div className='w-full h-1/2 md:w-1/2 md:h-full flex justify-center items-center order-2 md:order-1'>
        <div className='w-full h-full flex justify-center items-center'>
          <CldImage src='PiramidIcon' alt='PiramidImage' width={0} height={0} className='w-[300px] h-[200px]' ></CldImage>
        </div>
      </div>
      <div className='w-full h-1/2 md:w-1/2 md:h-full flex justify-center items-center flex-col gap-2 order-1 md:order-2 '>
        <h2 className='w-full font-extrabold text-center text-xl'>¿Quienes participan?</h2>
        <h4 className='w-full text-center font-light text-sm lg:text-base'>Multiples museos de diferentes partes del mundo son partes de nuestra red.</h4>
      </div>
    </section>
  )
}
export default Participants