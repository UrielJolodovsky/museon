"use client"
import React, { useState } from 'react'
import Carousel from './carousel/Carousel'
import NavLanding from './start/NavLanding'
import Presentation from './start/Presentation'
import Information from './start/Information'
import Help from './start/Help'
import Footer from './start/Footer'
import Participants from './start/Participants'
import Colecciones from '@/app/colecciones/Colecciones'
import Eventos from '@/app/eventos/Eventos'
import Contacto from '@/app/contacto/Contacto'



const FirstLanding = () => {

  const [selectedMenu, setSelectedMenu] = useState('Inicio');

  const handleMenuItemClick = (item: React.SetStateAction<string>) => {
    setSelectedMenu(item);
  };

  return (

    <>
      <header className='w-full h-[117px] flex justify-center bg-navColor relative'>
        <NavLanding onNavClick={handleMenuItemClick} />
      </header>
      {selectedMenu === 'Inicio' &&
        <>
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
      }
      {selectedMenu === 'Colecciones' && <Colecciones />}
      {selectedMenu === 'Eventos' && <Eventos />}
      {selectedMenu === 'Contacto' && <Contacto />}
    </>
  )
}

export default FirstLanding