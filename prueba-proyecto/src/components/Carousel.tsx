import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { CldImage } from 'next-cloudinary';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carousel = () => {
  const [museos, setMuseos] = useState([]);

  useEffect(() => {
    viewMuseos();
  }, []);

  const viewMuseos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/museos');
      setMuseos(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="w-full h-[600px] flex justify-center items-center flex-row gap-4">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 1000,
          modifier: 2.5,
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',

        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="my-custom-carousel"
      >
        {museos.map(({ id, name }) => (
          <SwiperSlide key={id}>
            <div className="carousel-item">
              <CldImage
                className='carousel-image'
                width='200'
                height='200'
                src={id}
                alt="Imagen Museo" />
              <h1 className="">{name}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
