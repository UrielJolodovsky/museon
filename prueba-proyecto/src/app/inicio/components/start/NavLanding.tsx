import React, { useContext, useState } from 'react'
import '../start/styles/line.css'
import '@/app/globals.css'
import MenuItems from './menuBar/MenuItems';
import { ExampleMenu } from './menuBar/ExampleMenu';

const NavLanding = () => {

  return (
    <header id='header' className='w-full h-[80px] justify-center items-center '>
      <nav className=' w-full h-full flex justify-center items-center p-6 flex-row bg-navColor '>
        <div className='flex items-center justify-start w-full h-full lg:hidden'>
          <ExampleMenu />
        </div>
        <MenuItems />
      </nav>
    </header>
  )
}

export default NavLanding