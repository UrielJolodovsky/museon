"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import NavLanding from './start/NavLanding'
import Presentation from './start/Presentation'
import Information from './start/Information'
import ScanInfo from './start/ScanInfo'
import Help from './start/Help'
import Footer from './start/Footer'



const FirstLanding = () => {


  return (
    <>
      <header className='w-full h-[117px] flex justify-center bg-navColor'>
        <NavLanding />
      </header>
      <main className='w-full h-full flex justify-center items-center flex-col bg-dashBack px-44'>
        <Presentation />
        <Carousel />
        <Information />
        <ScanInfo />
        <Help />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default FirstLanding