import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { EffectCoverflow, Pagination, Autoplay } from "swiper"
import Image from "next/image"
import Paisaje1 from '../../public/assets/Carousel/Paisaje1.png'
import Paisaje2 from '../../public/assets/Carousel/Paisaje2.png'
import Paisaje3 from '../../public/assets/Carousel/Paisaje3.png'
import Paisaje4 from '../../public/assets/Carousel/Paisaje4.png'
import Paisaje5 from '../../public/assets/Carousel/Paisaje5.png'
import { MuseosProps } from '@/types'
import SlideNext from './SlideNext'
import SlidePrev from './SlidePrev'

const Carousel = () => {
  const [museos, setMuseos] = useState<MuseosProps[]>([])

  const dataCarousel = [
    {
      id: 1,
      title: 'Museo de Arte Moderno',
      image: Paisaje1
    },
    {
      id: 2,
      title: 'Museo de Arte Contemporáneo',
      image: Paisaje2
    },
    {
      id: 3,
      title: 'Museo de Arte Antiguo',
      image: Paisaje3
    },
    {
      id: 4,
      title: 'HolaHolaHola',
      image: Paisaje4
    },
    {
      id: 5,
      title: 'vato',
      image: Paisaje5
    }
  ]


  return (

    <section className='w-full h-[600px] flex justify-center items-center flex-row'>
      <div className='w-full h-full flex flex-row justify-center items-center'>
        <div className='w-full h-[40rem] flex flex-row justify-center items-center rounded-3xl '>
          <Swiper
            effect={"coverflow"}
            spaceBetween={150}
            centeredSlides={true}
            slidesPerView={1.5}
            allowTouchMove={false}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 900,
            }}

            loop={true}
            modules={[EffectCoverflow]}
            className="flex flex-row justify-center items-center w-full"
          >
            <SlidePrev />
            {dataCarousel.map(({ id, title, image }) => {
              return (
                <SwiperSlide >
                  <div key={id} className='w-full h-full flex justify-center items-center '>
                    <Image className='w-full h-full justify-center items-center' src={image} alt='Carousel Image'></Image>
                  </div>
                </SwiperSlide>
              )
            })
            }
            <SlideNext />
          </Swiper>
        </div>
      </div>
    </section >
  )
}
export default Carousel