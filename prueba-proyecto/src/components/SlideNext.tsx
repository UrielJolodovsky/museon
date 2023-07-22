import React from 'react'
import { useSwiper } from 'swiper/react';
import { GrFormNext } from 'react-icons/gr'

export default function SlideNext() {
  const swiper = useSwiper();

  return (
    <button className='w-12 h-12' onClick={() => swiper.slideNext()}><GrFormNext className='w-full h-full' /></button>
  );
}