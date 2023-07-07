import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { EffectCoverflow, Pagination, Autoplay } from "swiper"
import { identifierToKeywordKind } from "typescript"
import Image from "next/image"
import Foto1 from '../../public/assets/Foto1.png'
import Foto2 from '../../public/assets/Foto2.png'
import Foto3 from '../../public/assets/Foto3.png'
import { MuseosProps } from '@/types'

const Carousel = () => {
  const [museos, setMuseos] = useState<MuseosProps[]>([])

  const dataCarousel = [
    {
      id: 1,
      title: 'Museo de Arte Moderno',
      Image: Foto1
    },
    {
      id: 2,
      title: 'Museo de Arte Contemporáneo',
      Image: Foto2
    },
    {
      id: 3,
      title: 'Museo de Arte Antiguo',
      Image: Foto3
    },
    {
      id: 4,
      title: 'HolaHolaHola',
    }
  ]


  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-96 h-56 flex justify-center items-center'>
        <Swiper
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={1.5}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 700,
            modifier: 1,
          }}
          loop={true}
          modules={[Autoplay, EffectCoverflow]}
          className="mySwiper p-12"
        >
          {dataCarousel.map(({ id, title, Image }) => {
            return (
              <SwiperSlide key={id}>
                <div className='w-64 h-40 bg-red flex justify-center items-center'>
                  <h1>{title}</h1>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}
export default Carousel