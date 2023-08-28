"use client"
import React, { useContext, useState } from 'react'
import Colecciones from '@/colecciones/Colecciones'
import Eventos from '@/eventos/Eventos'
import Footer from './components/start/Footer'
import Contact from './components/start/Contact'
import Help from './components/start/Help'
import Participants from './components/start/Participants'
import Information from './components/start/Information'
import Carousel from './components/carousel/Carousel'
import Presentation from './components/start/Presentation'
import NavLanding from './components/start/NavLanding'
import { StateContext, StateProvider } from '@/context/StateContext'
import { useSession } from 'next-auth/react'
import { statusAuth } from "@/load/status"
import Loader from '@/load/Loader'
import Ayuda from '@/ayuda/Ayuda'


const FirstLanding = () => {
  const { selectedMenu, setSelectedMenu } = useContext(StateContext);

  return (
    <>
      <header className='w-full h-[100px] flex justify-center relative'>
        <NavLanding />
      </header>
      {selectedMenu === 'Inicio' &&
        <>
          <main className='w-full sm:w-full h-full flex justify-center items-center flex-col bg-landingBack gap-20'>
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
      }
      {selectedMenu === 'Colecciones' && <Colecciones />}
      {selectedMenu === 'Eventos' && <Eventos />}
      {selectedMenu === 'Ayuda' && <Ayuda />}
    </>
  )
}

export default FirstLanding