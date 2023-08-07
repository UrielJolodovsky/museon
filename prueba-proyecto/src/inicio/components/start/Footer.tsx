import React, { useContext } from 'react'
import Face from '@/../../public/assets/FooterIcon/face.png'
import Insta from '@/../../public/assets/FooterIcon/insta.png'
import Twitter from '@/../../public/assets/FooterIcon/twitter.png'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { StateContext } from '@/context/StateContext'
import { link } from 'fs'

type Icon = {
  id: number;
  icon: StaticImageData;
  link: typeof link;
}

const Footer = () => {
  const { setSelectedMenu } = useContext(StateContext)
  const dataIcon = [
    {
      id: 1,
      icon: Insta,
      link: 'https://www.instagram.com/'
    },
    {
      id: 2,
      icon: Twitter,
      link: 'https://twitter.com/'
    },
    {
      id: 3,
      icon: Face,
      link: 'https://www.facebook.com/'
    },
  ]



  const dataFooter = [
    {
      id: 1,
      title: 'Colecciones',
    },
    {
      id: 2,
      title: 'Eventos',
    },
    {
      id: 3,
      title: 'Contacto',
    },
  ]

  return (
    <footer className='w-full h-full bg-footerColor flex justify-start items-center'>
      <div className='w-2/6 flex flex-col gap-4 justify-center items-center'>
        <h1 className='text-footerTitle font-semibold text-3xl'>Museon</h1>
        <div className='w-full h-full flex justify-center items-center flex-row gap-12'>
          {dataIcon.map(({ id, icon, link }) => {
            return (
              <Link
                href={link}
                target='_blank'
                rel="noopener noreferrer"
              >
                <Image
                  key={id}
                  src={icon}
                  alt='icon'
                  className='w-[40px] h-[40px]'
                >
                </Image>
              </Link>
            )
          })}
        </div>
      </div>
      <div className='w-4/6 flex flex-row justify-center items-center'>
        {dataFooter.map(({ id, title }) => {
          return (
            <ul className='flex justify-center items-center w-full' key={id}>
              <li className='flex justify-center items-center w-full '>
                <button className='text-xl font-normal text-footerTitle hover:underline transition'
                  onClick={() => setSelectedMenu(title)}
                >
                  {title}
                </button>
              </li>
            </ul>
          )
        })}
      </div>
    </footer>
  )
}

export default Footer