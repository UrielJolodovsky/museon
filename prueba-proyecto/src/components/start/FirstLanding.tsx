import { link } from 'fs'
import Link from 'next/link'
import React from 'react'

const FirstLanding = () => {
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
      title: 'Ayuda',
      link: '#'
    },
    {
      id: 4,
      title: 'Contacto',
      link: '#'
    },
  ]



  return (
    <header className='w-full h-24 bg-navColor'>
      <nav className='w-full h-full flex flex-row'>
        <ul className='w-full h-full flex flex-row items-center justify-evenly gap-6'>
          {DataNav.map(({ id, title, link }) =>
            <li key={id}>
              <Link
                id='MyLink'
                href={link}
                className='font-bold text-xl text-white '>
                {title}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default FirstLanding