"use client"
import React, { useContext, useState } from 'react'
import Footer from '@/app/inicio/components/start/Footer'
import Contact from '@/app/inicio/components/start/Contact'
import Help from '@/app/inicio/components/start/Help'
import Participants from '@/app/inicio/components/start/Participants'
import Information from '@/app/inicio/components/start/Information'
import Carousel from '@/app/inicio/components/carousel/Carousel'
import Presentation from '@/app/inicio/components/start/Presentation'



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
      <footer className='w-full h-[250px] md:hidden'>
        <Footer />
      </footer>
    </>
  )
}

export default FirstLanding