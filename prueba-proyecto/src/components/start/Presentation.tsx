import Image from 'next/image'
import React from 'react'
import Foto2 from '../../../public/assets/Foto2.png'

const Presentation = () => {
  return (
    <section className='w-full h-[600px] flex justify-center items-center flex-row'>
          <div className='w-full flex flex-col justify-center items-start gap-6'>
            <div className='w-10/12 justify-center items-center flex flex-col gap-3'>
              <h1 className=' w-full text-center font-bold text-5xl'>¡Bienvenido a MuseOn!</h1>
              <h3 className='w-8/12 text-center text-base'>Disfruta de la experiencia de visitar museos desde la comodidad de tu casa</h3>
              <video className='rounded-lg' src="video1.mp4" height={400} width={400} controls autoPlay loop muted></video>
            </div>
          </div>
          <div className='w-2/6 h-full flex justify-center items-center'>
            <Image src={Foto2} alt='logo' height={600} width={600}></Image>
          </div>
        </section>
  )
}

export default Presentation