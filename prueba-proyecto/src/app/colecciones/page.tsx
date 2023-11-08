
'use client';
import { CldImage } from 'next-cloudinary'
import React, { useState, useEffect } from 'react'
import { MuseosProps } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import dir_url from '@/lib/url';
import useMuseos from '@/hooks/useMuseos';


const Colecciones = () => {
  const [museos, setMuseos] = useState<MuseosProps[]>([])
  const [nomMuseo, setNomMuseo] = useState('')
  const router = useRouter()


  useEffect(() => {
    useMuseos().then((res) => {
      setMuseos(res)
    })
  }, [])

  const deleteSpace = (slug: string) => {
    const newSlug = slug.replace(/\s/g, '-')
    return newSlug
  }

  return (
    <div className='w-full h-screen pt-20 md:px-40 flex flex-col justify-center items-center  '>
      <h1 className='text-center text-2xl font-medium'>Colecciones</h1>
      <div className='w-full h-full flex justify-center items-center gap-x-10 flex-wrap'>
        {museos.map(({ id, subimage, name, subname }) => {
          return (
            <div className='w-[300px] h-[375px] lg:w-[300px] flex flex-col ' key={id}>
              <button onClick={() => router.push(`/${deleteSpace(subname)}`)} className='w-full h-full flex flex-col gap-6 justify-center items-center rounded-xl transition hover:scale-95' >
                <CldImage className='h-3/6 rounded-lg w-full' width={300} height={300} src={id} alt="Imagen Museo" />
                <div className='w-full h-1/6 flex justify-center items-center flex-col gap-2'>
                  <CldImage alt={''} src={subimage} className='' width={150} height={60}></CldImage>
                  <h1 className=' font-normal text-gray text-center text-base'>{name}</h1>
                </div>
              </button>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}


export default Colecciones
