import React from 'react';
import { useSwiper } from 'swiper/react';

export default function SlidePrev() {
  const swiper = useSwiper();

  return (
    <button className='w-1/2 flex justify-start flex-row' onClick={() => swiper.slidePrev()}>Slide to the prev slide</button>
  );
}