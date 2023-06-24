'use client';
import { CldImage } from 'next-cloudinary'
import React, { useState, useEffect } from 'react'
import { MuseosProps } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const Museos = () => {

  const [museos, setMuseos] = useState<MuseosProps[]>([])
  const router = useRouter()

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
    <div className='w-full flex flex-row gap-4'>
      {museos.map(({ id, name }) => {
        return (
          <div className=' w-full mr-10 ml-10   flex flex-row justify-center' key={id}>
            <button onClick={() => router.push(`/dashboard/${id}`)}>
            <CldImage className='rounded-xl flex flex-row' width='300' height='300' src={id} alt="Imagen Museo" />
            <h1>{name}</h1>
            </button>
          </div>
        )
      })
      }
    </div>)
}

export default Museos