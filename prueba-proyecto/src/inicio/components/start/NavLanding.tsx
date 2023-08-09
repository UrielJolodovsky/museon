import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import '../start/styles/line.css'
import { signOut, useSession } from 'next-auth/react';
import { StateContext } from '@/context/StateContext';


const NavLanding = () => {
  const { data: sessionData } = useSession()
  const nombre = sessionData?.user ? sessionData.user.name : ''

  const { setSelectedMenu } = useContext(StateContext);

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
      title: 'Contacto',
    },
  ]

  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <nav className='w-full h-[100px] flex justify-center items-center p-6 flex-row bg-navColor fixed z-10'>
      <ul className='w-full h-full flex flex-row items-center justify-evenly'>
        {sessionData?.user ? (
          <h2 className='text-[25px] font-extrabold text-black '>Hi {nombre}</h2>
        ) : (
          <h2 className='text-[25px] font-extrabold text-white'>Hi Guest</h2>
        )}
        {DataNav.map(({ id, title }) =>
          <li className='list-none text-center flex flex-col justify-center items-center' key={id}>
            <button
              id='MyLink'
              className='text-[25px] font-normal text-black link leading-tight'
              onClick={() => setSelectedMenu(title)}
            >
              {title}
            </button>
            <div className='line'></div>
          </li>
        )}
        {sessionData?.user ? (
          <button onClick={() => signOut()} className='w-[190px] h-[70px] rounded-full text-white bg-black hover:scale-110 transition'>
            <h1 className='text-[25px]'>Log out</h1>
          </button>
        ) : (
          <button onClick={handleLogin} className='w-[190px] h-[70px] rounded-full text-white bg-black hover:scale-110 transition'>
            <h1 className='text-[25px]'>Log in</h1>
          </button>
        )
        }
      </ul>
    </nav>
  )
}

export default NavLanding