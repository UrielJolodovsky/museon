'use client';
import { CldImage } from 'next-cloudinary'
import React, { useState, useEffect } from 'react'
import { MuseosProps } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import dir_url from '@/lib/url';

const Museos = () => {

  const [museos, setMuseos] = useState<MuseosProps[]>([])
  const router = useRouter()


  useEffect(() => {
    viewMuseos()
    console.log(dir_url)
  }, [])

  const viewMuseos = async () => {
    await axios.get(`${dir_url}/api/museos`)
      .then((response) => {
        setMuseos(response.data)
      })
  }


  return (
    <div className='w-full flex flex-row gap-4'>
      {museos.map(({ id, name }) => {
        return (
          <div className=' w-full mr-10 ml-10 flex flex-col justify-center items-center gap-6' key={id}>
            <CldImage className='rounded-xl flex flex-row' width='300' height='300' src={id} alt="Imagen Museo" />
            <h1>{name}</h1>
            <button onClick={() => router.push(`/dashboard/${id}`)} className='w-full h-12 bg-btnForm text-white font-bold text-lg rounded-xl hover:bg-btnFormHover transition' >
              Ir al museo
            </button>
          </div>
        )
      })
      }
    </div>)
}

export default Museos