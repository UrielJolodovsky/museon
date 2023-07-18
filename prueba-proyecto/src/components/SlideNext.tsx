import React from 'react'
import { useSwiper } from 'swiper/react';

export default function SlideNext() {
  const swiper = useSwiper();

  return (
    <button className='w-1/2 flex justify-end flex-row' onClick={() => swiper.slideNext()}>Slide to the next slide</button>
  );
}