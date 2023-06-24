"use client"
import '@/components/start/carousel.css'
import Image from 'next/image'
import Foto1 from '../../../public/assets/Foto1.png'
import Foto2 from '../../../public/assets/Foto2.png'
import Foto3 from '../../../public/assets/Foto3.png'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Icono3D from '../../../public/assets/Icono3D.png'
import Carousel from '../Carousel'
import { useRouter } from 'next/navigation'



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

  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

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
            <button onClick={handleLogin} className='w-[170px] h-[50px] rounded-lg text-black border-2'>
              <h1 className='text-2xl p-2'>Login</h1>
            </button>
          </ul>
        </nav>
      </header>
      <main className='w-full h-max flex-col bg-dashBack px-44'>
        <section className='w-full h-[600px] flex justify-center items-center flex-row'>
          <div className='w-full flex flex-col justify-center items-start gap-6'>
            <div className='w-10/12 justify-center items-center flex flex-col gap-3'>
              <h1 className=' w-full text-center font-bold text-5xl'>¡Bienvenido a MuseOn!</h1>
              <h3 className='w-8/12 text-center text-base'>Disfruta de la experiencia de visitar museos desde la comodidad de tu casa</h3>
              <video className='rounded-lg' src="video1.mp4" height={400} width={400} controls autoPlay loop muted></video>
            </div>
          </div>
          <div className='w-2/6 flex justify-center items-start'>
            <Image src={Foto2} alt='' height={200} width={200}></Image>
          </div>
        </section>
        <section className='w-full h-[400px] flex justify-center items-center flex-row'>
          <div className='w-10/12 flex flex-col justify-center items-start gap-4'>
            <h1 className='w-3/4 text-start text-4xl'>¿De que se trata?</h1>
            <p className=' w-3/4 text-start text-lg'>Es una plataforma web de accesibilidad universal donde usuarios van a poder visitar museos y/o galerias artisticas de todo el mundo desde la comodidad de su hogar</p>
          </div>
          <div className='w-4/12 flex justify-center items-center'>
            <Image src={Foto1} alt='Tecnología' height={350} width={350}></Image>
          </div>
        </section>
        <section className='w-full h-max flex justify-center items-center flex-row'>
          <Carousel />
        </section>
        <section >
          <div className='w-full h-[500px] flex justify-center items-center flex-col gap-8'>
            <Image
              src={Icono3D}
              alt='Icon 3D'
              height={300}
              width={300}
            ></Image>
            <div className='w-full flex justify-center items-center flex-col gap-3'>
              <h2 className='font-normal text-5xl'>Escaneo 3D</h2>
              <h4 className='w-1/2 text-center font-light text-lg'>Multiples museos de diferentes partes del mundo son partes de nuestra red.</h4>
            </div>
          </div>
        </section>
        <section className='w-full h-[500px] flex justify-start items-center flex-col gap-8'>
          <div className='w-full flex justify-center items-center flex-row'>
            <div className='w-1/2 flex justify-center items-center flex-col gap-6 pt-20'>
              <h2 className='font-normal text-center text-5xl'>¿Como funciona?</h2>
              <h5 className='w-full text-center font-light text-lg'>La institución que asi lo desea, escanea con su celular y lo sube a la plataforma. Desde aquel momento los usuarios lo pueden disfrutar</h5>
            </div>
            <Image
              className='w-1/2'
              src={Foto3}
              alt='Modelos 3D'
              height={300}
              width={300}></Image>
          </div>
        </section>
      </main>
      <footer className="w-full h-44 bg-footerColor">

      </footer>

    </>
  )
}

export default FirstLanding