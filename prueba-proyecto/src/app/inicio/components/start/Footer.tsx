import React from 'react'
import Face from '@/../../public/assets/FooterIcon/face.png'
import Insta from '@/../../public/assets/FooterIcon/insta.png'
import Twitter from '@/../../public/assets/FooterIcon/twitter.png'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

const Footer = () => {

  const dataIcon = [
    {
      id: 1,
      icon: Insta,
    },
    {
      id: 2,
      icon: Twitter,
    },
    {
      id: 3,
      icon: Face,
    },
  ]

  const dataFooter = [
    {
      id: 1,
      title: 'Colecciones',
      link: '#'
    },
    {
      id: 2,
      title: 'Eventos',
      link: '#'
    },
    {
      id: 3,
      title: 'Contacto',
      link: '#'
    },
  ]

  return (
    <footer className='w-full h-[250px] bg-footerColor flex justify-start items-center'>
      <div className='w-2/6 flex flex-col gap-4 justify-center items-center'>
        <h1 className='text-footerTitle font-semibold text-3xl'>Museon</h1>
        <div className='w-full h-full flex justify-center items-center flex-row gap-12'>
          {dataIcon.map(({ id, icon }) => {
            return (
              <Image
                key={id}
                src={icon}
                alt='icon'
                className='w-[40px] h-[40px]'
              >
              </Image>
            )
          })}
        </div>
      </div>
      <div className='w-4/6 flex flex-row justify-center items-center'>
        {dataFooter.map(({ id, link, title }) => {
          return (
            <ul className='flex justify-center items-center w-full' key={id}>
              <Link className='text-xl font-normal text-footerTitle' href={link}>{title}</Link>
            </ul>
          )
        })}
      </div>
    </footer>
  )
}

export default Footer