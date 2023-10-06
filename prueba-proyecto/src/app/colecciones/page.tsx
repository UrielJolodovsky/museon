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
  const [tipoMuseo, setTipoMuseo] = useState('')
  const [nomMuseo, setNomMuseo] = useState('')
  const router = useRouter()
  const filtro = ['Deporte', 'Arte', 'Historia', 'Galerias']
  const [filtered, setFiltered] = useState<MuseosProps[]>([]);

  const FilterMuseums = (search: String) => {
    // if (search === '' || type === '') {
    //   setFiltered(museos)
    // }
    // // Filtrar cuando search y type no estén vacios
    // if (search !== '') {
    //   setFiltered(filtered.filter((museo) => {
    //     return museo.name.toLowerCase().includes(search.toLowerCase())
    //   }))
    // }
    // if (type !== '') {
    //   setFiltered(filtered.filter((museo) => {
    //     return museo.role.toLowerCase() === type.toLowerCase()
    //   }))
    // }
    if (search === '') setFiltered(museos)
    // else if (search === '') setFiltered(museos.filter((museo) => museo.role.toLowerCase() === type.toLowerCase()))
    // else if (type === '') setFiltered(museos.filter((museo) => museo.name.toLowerCase().includes(search.toLowerCase())))
    else {
      setFiltered(museos.filter((museo) => {
        return museo.name.toLowerCase().includes(search.toLowerCase())
      }
      ))
    }
  }

  useEffect(() => {
    useMuseos().then((res) => {
      setMuseos(res) 
      setFiltered(res)
    })
  }, [])

  // const viewMuseos = async () => {
  //   await axios.get(`${dir_url}/api/museos`)
  //     .then((response) => {
  //       setMuseos(response.data)
  //       setFiltered(response.data)
  //     })
  // }

  const changeSelect = (ev: any) => {
    setTipoMuseo(ev.target.value)
  }

  const changeSearch = (ev: any) => {
    FilterMuseums(ev.target.value)
    setNomMuseo(ev.target.value)
    console.log(nomMuseo)
  }



  const deleteSpace = (slug: string) => {
    const newSlug = slug.replace(/\s/g, '-')
    return newSlug
  }



  return (
    <div className='w-full h-full pt-20 px-40 flex flex-col justify-center items-center  '>
      <h1 className='text-center text-2xl font-medium'>Colecciones</h1>
      <div className='w-full flex flex-row justify-center items-center gap-10 flex-wrap'>
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