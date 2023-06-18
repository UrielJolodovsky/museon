import { MuseosProps } from '@/types'
import axios from 'axios'
import { link } from 'fs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react'
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
  const [museos, setMuseos] = useState<MuseosProps[]>([])

  useEffect(() => {
    viewMuseos()
  }, [museos])

const viewMuseos = async () => {
  await axios.get('http://localhost:3000/api/museos')
  .then((response) => {
    setMuseos(response.data)
    console.log(response.data)
  })
}

  return (
    <>
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
    {/* <Image cloudName="" /> */}
    <img src='https://cloudi'></img>
    </>
  )
}

export default FirstLanding