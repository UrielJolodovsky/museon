import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import '../start/styles/line.css'
import { signOut, useSession } from 'next-auth/react';
import '@/app/globals.css'
import { CldImage } from 'next-cloudinary';
import Image from 'next/image'
import LogOut from '../../../../../public/assets/icons/LogOut.png'
import { motion } from 'framer-motion';


const NavLanding = () => {
  const { data: sessionData } = useSession()
  const [active, setActive] = useState(false)
  const [activeHover, setActiveHover] = useState(false)


  const DataNav = [
    {
      id: 1,
      title: 'Inicio',
    },
    {
      id: 2,
      title: 'Colecciones',

    },
    {
      id: 3,
      title: 'Eventos',

    },
    {
      id: 4,
      title: 'Ayuda',
    },
  ]

  const router = useRouter()

  const setValuesEvent = () => {
    setActive(!active);
    setActiveHover(false)
  }



  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <header className='w-full h-[80px] overflow-hidden flex justify-center relative header-layout '>
      <nav className=' w-full h-[80px] navbar flex justify-center items-center p-6 flex-row bg-navColor fixed z-10'>
        <ul className='w-full h-full flex flex-row items-center justify-evenly nav-ul '>
          <div>
            <CldImage src={'Logo_Blanco'} width={50} height={50} alt='logo'></CldImage>
          </div>
          {DataNav.map(({ id, title }) =>
            <li className=' list-none text-center flex flex-col justify-center items-center mt-1' key={id}>
              <button
                id='MyLink'
                className='navElements font-normal text-white link '
                onClick={() => { id === 4 ? router.push(`/${title}`) : router.push(`/${title.toLowerCase()}`) }}
              >
                {title}
              </button>
              <div className='line'></div>
            </li>
          )}
          {sessionData?.user ? (
            <div>
              <label
                className='cursor-pointer flex justify-center items-center flex-col'
                id='logOut-label'
                onMouseEnter={() => setActiveHover(true)}
                onMouseLeave={() => setActiveHover(false)}
                onClick={setValuesEvent}
              >

                <Image
                  className='w-7 h-8'
                  src={LogOut}
                  alt='LogOut'
                  height={400}
                  width={400}></Image>
                {activeHover === true && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    id='logOut-button'
                    className='w-28 h-10 rounded-lg bg-gray absolute top-24 text-center flex items-center justify-center text-white font-medium'>
                    {sessionData?.user?.name ? sessionData?.user?.name : sessionData?.user?.email}
                  </motion.span>
                )}
              </label>
              {active === true && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id='logOut-button'
                  onClick={() => signOut()}
                  className='w-36 h-10 rounded-lg cursor-pointer bg-gray absolute top-24 right-44 text-center flex items-center justify-center text-white font-medium'>
                  Cerrar sesión
                </motion.span>
              )}
            </div>
          ) : (
            <button onClick={handleLogin} className='w-40 p-4 h-12 flex justify-center items-center rounded-full text-black hover:scale-95 bg-white  transition'>
              <h1 className='text-[18px] font-bold navElements'>Iniciar sesión</h1>
            </button>
          )
          }
        </ul>
      </nav>
    </header>
  )
}

export default NavLanding