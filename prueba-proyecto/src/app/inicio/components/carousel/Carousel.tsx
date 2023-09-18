import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { EffectCoverflow, Pagination, Autoplay } from "swiper"
import Image from "next/image"
import Paisaje1 from '@/../public/assets/Carousel/Paisaje1.png'
import Paisaje2 from '@/../public/assets/Carousel/Paisaje2.png'
import Paisaje3 from '@/../public/assets/Carousel/Paisaje3.png'
import Paisaje4 from '@/../public/assets/Carousel/Paisaje4.png'
import Paisaje5 from '@/../public/assets/Carousel/Paisaje5.png'
import { MuseosProps } from '@/types'
import SlideNext from './SlideNext'
import SlidePrev from './SlidePrev'
import { CldImage } from 'next-cloudinary'

const Carousel = () => {
  const [museos, setMuseos] = useState<MuseosProps[]>([])

  const dataCarousel = [
    {
      id: "MOMA",
    },
    {
      id: "ORT",
    },
    {
      id: "LOUVRE",
    },
    {
      id: "MET",
    },
    {
      id: "BELLASARTES",
    }
  ]


  return (

    <section className='w-full h-[600px] lg:h-[400px] flex justify-center items-center flex-row pb-20'>
      <div className='w-full h-full flex flex-col justify-center items-center gap-14 '>
        <h1 className='text-center text-4xl font-semibold'>Museos Disponibles</h1>
        <div className='w-[1000px] h-[20rem] lg:h-[15rem] flex flex-row justify-center items-center rounded-3xl p-12'>
          <Swiper
            effect={"coverflow"}
            spaceBetween={200}
            centeredSlides={true}
            slidesPerView={1.5}
            allowTouchMove={false}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 900,
            }}

            loop={true}
            modules={[Autoplay, EffectCoverflow]}
            className="w-[600px] h-[350px] bg-transparent mx-0 m-0"
          >
            {dataCarousel.map(({ id }) => {
              return (
                <SwiperSlide className='w-full h-full flex justify-center items-center '>
                  <div key={id} className='w-full h-full flex justify-center items-center rounded-3xl border-2 '>
                    <CldImage alt={''} src={id} width={350} height={350} className='w-full h-full bg-cover object-cover rounded-3xl' ></CldImage>
                  </div>
                </SwiperSlide>
              )
            })
            }
          </Swiper>
        </div>
      </div>
    </section >
  )
}
export default Carousel