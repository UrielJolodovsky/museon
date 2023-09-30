import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import { EffectCoverflow, Autoplay } from "swiper"
import { MuseosProps } from '@/types'
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

    <section className='w-full h-[300px] md:h-[500px] flex justify-center items-center flex-row overflow-hidden'>
      <div className='w-full h-full flex flex-col justify-start items-center gap-16 '>
        <h1 className='text-center text-2xl font-semibold'>Museos Disponibles</h1>
        <div className='w-[450px] md:w-[600px] h-[10rem] md:h-[400px] flex flex-row justify-center items-center rounded-3xl'>
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
            className="w-[500px] md:w-[700px] h-[250px] md:h-[350px]"
          >
            {dataCarousel.map(({ id }) => {
              return (
                <SwiperSlide className='w-full h-full flex justify-center items-center'>
                  <div key={id} className='w-full h-full flex justify-center items-center rounded-3xl border-4 bg-white'>
                    <CldImage alt={''} src={id} width={350} height={350} className='w-full h-full rounded-3xl opacity-1' ></CldImage>
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