import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const NavLanding = () => {
    const DataNav = [
        {
          id: 1,
          title: 'Inicio',
          link: '#'
        },
        {
          id: 2,
          title: 'Colecciones',
          link: '#'
        },
        {
          id: 3,
          title: 'Eventos',
          link: '#'
        },
        {
          id: 4,
          title: 'Contacto',
          link: '#'
        },
      ]
    
      const router = useRouter()
    
      const handleLogin = () => {
        router.push('/login')
      }

  return (
        <nav className='w-11/12 h-full flex justify-center items-center p-6 flex-row '>
          <ul className='w-full h-full flex flex-row items-center justify-between'>
            {DataNav.map(({ id, title, link }) =>
              <li className='list-none text-center' key={id}>
                <Link
                  id='MyLink'
                  href={link}
                  className='text-3xl font-normal text-white link'>
                  {title}
                </Link>
                <div className='line'></div>
              </li>
            )}
            <button onClick={handleLogin} className='w-[180px] h-[70px] rounded-3xl text-black bg-white hover:bg-dashHover transition'>
              <h1 className='text-3xl'>Log in</h1>
            </button>
          </ul>
        </nav>
  )
}

export default NavLanding