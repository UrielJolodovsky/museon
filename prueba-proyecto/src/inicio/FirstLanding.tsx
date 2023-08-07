"use client"
import React, { useContext, useState } from 'react'
import Colecciones from '@/colecciones/Colecciones'
import Eventos from '@/eventos/Eventos'
import Contacto from '@/contacto/Contacto'
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


const FirstLanding = () => {
  const { selectedMenu, setSelectedMenu } = useContext(StateContext);

  return (
    <>
      <header className='w-full h-[117px] flex justify-center bg-navColor relative'>
        <NavLanding />
      </header>
      {selectedMenu === 'Inicio' &&
        <>
          <main className='w-full h-full flex justify-center items-center flex-col bg-landingBack px-36'>
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
      {selectedMenu === 'Contacto' && <Contacto />}
    </>
  )
}

export default FirstLanding