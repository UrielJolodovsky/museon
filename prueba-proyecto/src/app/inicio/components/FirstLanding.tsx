"use client"
import React from 'react'
import Carousel from './carousel/Carousel'
import NavLanding from './start/NavLanding'
import Presentation from './start/Presentation'
import Information from './start/Information'
import Help from './start/Help'
import Footer from './start/Footer'
import Participants from './start/Participants'



const FirstLanding = () => {


  return (
    <>
      <header className='w-full h-[117px] flex justify-center bg-navColor'>
        <NavLanding />
      </header>
      <main className='w-full h-full flex justify-center items-center flex-col bg-dashBack px-36'>
        <Presentation />
        <Carousel />
        <Information />
        <Participants />
        <Help />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default FirstLanding