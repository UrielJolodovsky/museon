import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import '../start/styles/line.css'
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { VscSignOut } from 'react-icons/vsc';

type HeaderProps = {
  onNavClick: (menuItem: string) => void;
};

const NavLanding: React.FC<HeaderProps> = ({ onNavClick }) => {
  const { data: sessionData } = useSession()
  const nombre = sessionData?.user ? sessionData.user.name : ''

  const DataNav = [
    {
      id: 1,
      title: 'Inicio',
      onClick: () => onNavClick('Inicio'),
    },
    {
      id: 2,
      title: 'Colecciones',
      onClick: () => onNavClick('Colecciones'),

    },
    {
      id: 3,
      title: 'Eventos',
      onClick: () => onNavClick('Eventos'),

    },
    {
      id: 4,
      title: 'Contacto',
      onClick: () => onNavClick('Contacto'),

    },
  ]

  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  const handleLogout = () => {

  }


  return (
    <nav className='w-11/12 h-full flex justify-center items-center p-6 flex-row bg-navColor'>
      <ul className='w-full h-full flex flex-row items-center justify-between'>
        {sessionData?.user ? (
          <h2 className='text-xl font-extrabold text-white'>Hi {nombre}</h2>
        ) : (
          <h2 className='text-xl font-extrabold text-white'>Hi Guest</h2>
        )}
        {DataNav.map(({ id, title, onClick }) =>
          <li className='list-none text-center' key={id}>
            <button
              id='MyLink'
              className='text-xl font-normal text-white link'
              onClick={onClick}
            >
              {title}
            </button>
            <div className='line'></div>
          </li>
        )}
        {sessionData?.user ? (
          <button onClick={() => signOut()} className='w-[150px] h-[40px] rounded-xl text-black bg-white hover:bg-dashHover transition'>Log Out</button>
        ) : (
          <button onClick={handleLogin} className='w-[150px] h-[40px] rounded-xl text-black bg-white hover:bg-dashHover transition'>
            <h1 className='text-xl'>Log in</h1>
          </button>
        )
        }

      </ul>
    </nav>
  )
}

export default NavLanding