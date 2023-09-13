"use client"
import React, { useContext, useState } from 'react'
import Footer from '@/app/Inicio/components/start/Footer'
import Contact from '@/app/Inicio/components/start/Contact'
import Help from '@/app/Inicio/components/start/Help'
import Participants from '@/app/Inicio/components/start/Participants'
import Information from '@/app/Inicio/components/start/Information'
import Carousel from '@/app/Inicio/components/carousel/Carousel'
import Presentation from '@/app/Inicio/components/start/Presentation'



const FirstLanding = () => {

  return (
    <>
      <main className='w-full h-full flex justify-center items-center flex-col bg-landingBack gap-10 md:gap-5 '>
        <Presentation />
        <Carousel />
        <Information />
        <Participants />
        <Help />
        <Contact />
      </main>
      <footer className='w-full h-[250px]'>
        <Footer />
      </footer>
    </>
  )
}

export default FirstLanding