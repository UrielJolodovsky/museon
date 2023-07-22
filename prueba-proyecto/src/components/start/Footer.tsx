import React from 'react'
import Face from '../../../public/assets/FooterIcon/face.png'
import Insta from '../../../public/assets/FooterIcon/insta.png'
import Twitter from '../../../public/assets/FooterIcon/twitter.png'
import Image, { StaticImageData } from 'next/image'

const Footer = () => {

  const dataFooter = [
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

  return (
    <footer className='w-full h-[250px] bg-footerColor flex justify-start items-center'>
      <div className='w-2/6 flex flex-col gap-4 justify-center items-center'>
        <h1 className='text-footerTitle font-semibold text-3xl'>Museon</h1>
        <div className='w-full h-full flex justify-center items-center flex-row gap-12'>
          {dataFooter.map(({ id, icon }) => {
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
    </footer>
  )
}

export default Footer