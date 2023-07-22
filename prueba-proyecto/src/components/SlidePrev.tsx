import React from 'react';
import { useSwiper } from 'swiper/react';
import { GrFormPrevious } from 'react-icons/gr';

export default function SlidePrev() {
  const swiper = useSwiper();

  return (
    <button className='w-12 h-12' onClick={() => swiper.slidePrev()}><GrFormPrevious className='w-full h-full' /></button>
  
  );
}