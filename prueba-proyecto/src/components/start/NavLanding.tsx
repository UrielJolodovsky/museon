
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
          title: 'Museos',
          link: '#'
        },
        {
          id: 3,
          title: 'Ayuda',
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
                  className='text-2xl text-black link'>
                  {title}
                </Link>
                <div className='line'></div>
              </li>
            )}
            <button onClick={handleLogin} className='w-[170px] h-[50px] rounded-lg text-black border-2 hover:bg-dashHover transition'>
              <h1 className='text-2xl p-2'>Login</h1>
            </button>
          </ul>
        </nav>
  )
}

export default NavLanding