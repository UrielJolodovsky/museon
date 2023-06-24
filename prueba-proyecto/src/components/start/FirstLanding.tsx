"use client"

import Image from 'next/image'
import Foto1 from '../../../public/assets/image15.png'
import Foto2 from '../../../public/assets/Foto2.jpg'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



const FirstLanding = () => {
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

  return (
    <>
      <header className='w-full h-20 flex justify-center border-black border-b-2 '>
        <nav className='w-11/12 h-full flex justify-center items-center p-6 flex-row '>
          <ul className='w-full h-full flex flex-row items-center justify-between'>
            {DataNav.map(({ id, title, link }) =>
              <li key={id}>
                <Link
                  id='MyLink'
                  href={link}
                  className='text-2xl text-black'>
                  {title}
                </Link>
              </li>
            )}
            <button className='w-[170px] h-[50px] rounded-lg text-black border-2'>
              <h1 className='text-2xl p-2'>Login</h1>
            </button>
          </ul>
        </nav>
      </header>
      <main className='w-full h-max flex-col bg-dashBack px-44'>
        <section className='w-full h-[600px] flex justify-center items-center flex-row'>
          <div className='w-4/6 flex flex-col justify-center items-center gap-6'>
            <div className='w-full justify-start items-center flex flex-col gap-3'>
              <h1 className=' w-full text-center font-bold text-5xl'>¡Bienvenido a MuseOn!</h1>
              <h3 className='w-2/4 text-center text-base'>Disfruta de la experiencia de visitar museos desde la comodidad de tu casa</h3>
            </div>
            <video className='rounded-lg' src="video1.mp4" height={400} width={400} controls autoPlay loop muted></video>
          </div>
          <div className='w-2/6 flex justify-center items-start'>
            <Image src={Foto2} alt='' height={200} width={200}></Image>
          </div>
        </section>
        <section className='w-full h-[400px] flex justify-center items-center flex-row'>
          <div className='w-4/6 flex flex-col justify-center items-start gap-4'>
            <h1 className='w-3/4 text-start text-4xl'>¿De que se trata?</h1>
            <p className=' w-3/4 text-start text-lg'>Es una plataforma web de accesibilidad universal donde usuarios van a poder visitar museos y/o galerias artisticas de todo el mundo desde la comodidad de su hogar</p>
          </div>
          <div className='w-2/6 flex justify-center items-center'>
            <Image src={Foto1} alt='Tecnología' height={350} width={350}></Image>
          </div>
        </section>
      </main>

    </>
  )
}

export default FirstLanding