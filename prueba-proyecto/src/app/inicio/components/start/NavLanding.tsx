import React, { useContext, useState } from 'react'
import '../start/styles/line.css'
import '@/app/globals.css'
import MenuItems from './MenuItems';
import NavMenu from './menuBar/NavMenu';

const NavLanding = () => {

  return (
    <header id='header' className='w-full h-[80px] justify-center items-center bg-navColor  '>
      <NavMenu />
      <nav className=' w-full h-full justify-center items-center p-6 flex-row  hidden md:flex '>
        <MenuItems />
      </nav>
    </header>
  )
}

export default NavLanding