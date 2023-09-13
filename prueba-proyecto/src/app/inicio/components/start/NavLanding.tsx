import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import '../start/styles/line.css'
import { signOut, useSession } from 'next-auth/react';
import { StateContext } from '@/context/StateContext';
import '@/app/globals.css'



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
      title: 'Ayuda',
    },
  ]

  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <nav className='w-full h-[100px] navbar flex justify-center items-center p-6 flex-row bg-navColor fixed z-10'>
      <ul className='w-full h-full flex flex-row items-center justify-between nav-ul'>
        {sessionData?.user ? (
          <h2 className='text-[25px] navElements font-extrabold text-white '>Hi {nombre}</h2>
        ) : (
          <h2 className='text-[25px] navElements font-extrabold text-white'>Hi Guest</h2>
        )}
        {DataNav.map(({ id, title }) =>
          <li className=' list-none text-center flex flex-col justify-center items-center mt-1' key={id}>
            <button
              id='MyLink'
              className='navElements font-normal text-white link '
              onClick={() => router.push(`/${title}`)}
            >
              {title}
            </button>
            <div className='line'></div>
          </li>
        )}
        {sessionData?.user ? (
          <button onClick={() => signOut()} className='w-20 h-12 border-x-2 border-white text-white hover:underline transition'>
            <h1 className='text-[18px] font-bold navElements'>Log out</h1>
          </button>
        ) : (
          <button onClick={handleLogin} className='w-20 h-12 border-x-2 border-white text-white hover:underline transition'>
            <h1 className='text-[18px] font-bold navElements'>Log in</h1>
          </button>
        )
        }
      </ul>
    </nav>
  )
}

export default NavLanding