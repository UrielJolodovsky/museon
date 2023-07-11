import Image from 'next/image'
import React from 'react'
import Icono3D from '../../../public/assets/Icono3D.png'

const ScanInfo = () => {
  return (
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
  )
}

export default ScanInfo