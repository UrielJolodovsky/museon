"use client";
import React, { useState } from "react";
import FirstLanding from "./inicio/components/FirstLanding";
import NavLanding from "./inicio/components/start/NavLanding";
import Colecciones from "./colecciones/Colecciones";
import Contacto from "./contacto/Contacto";
import Eventos from "./eventos/Eventos";


export default function Home({ }) {
  const [selectedMenu, setSelectedMenu] = useState('Inicio');

  const handleMenuItemClick = (item: React.SetStateAction<string>) => {
    setSelectedMenu(item);
  };


  return (
    <>
      <header className='w-full h-[117px] flex justify-center bg-navColor'>
        <NavLanding onNavClick={handleMenuItemClick} />
      </header>
      {selectedMenu === 'Inicio' && <FirstLanding />}
      {selectedMenu === 'Colecciones' && <Colecciones />}
      {selectedMenu === 'Eventos' && <Eventos />}
      {selectedMenu === 'Contacto' && <Contacto />}
    </>
  )
}
