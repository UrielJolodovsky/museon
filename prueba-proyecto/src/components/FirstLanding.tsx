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
    <header className='w-full h-20 flex justify-center border-black border-b-2 '>
      <NavLanding/>
    </header>  
    <main className='w-full h-max flex-col bg-dashBack px-44'>
      <Presentation/>
      <Information/>
      <Carousel />
      <ScanInfo/>
      <Help/>
    </main>
    <footer>
      <Footer/>
    </footer>
    </>
  )
}

export default FirstLanding