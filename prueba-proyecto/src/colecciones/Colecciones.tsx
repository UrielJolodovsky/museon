'use client';
import { CldImage } from 'next-cloudinary'
import React, { useState, useEffect } from 'react'
import { MuseosProps } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import dir_url from '@/lib/url';

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
    viewMuseos()
  }, [])

  const viewMuseos = async () => {
    await axios.get(`${dir_url}/api/museos`)
      .then((response) => {
        setMuseos(response.data)
        setFiltered(response.data)
      })
  }

  const changeSelect = (ev: any) => {
    setTipoMuseo(ev.target.value)
  }

  const changeSearch = (ev: any) => {
    FilterMuseums(ev.target.value)
    setNomMuseo(ev.target.value)
    console.log(nomMuseo)
  }



  const deleteSpace = (slug : string) => {
    const newSlug = slug.replace(/\s/g, '-')
    return newSlug    
  }



  return (
    <div className='w-full flex flex-row gap-4 '>
      <div className='w-full flex flex-row  gap-4  '>
      {museos.map(({ id, name }) => {
        return (
          <div className=' w-full flex flex-row justify-center items-center gap-6 flex-wrap' key={id}>
            <div className='w-1/3 flex flex-col'>
            <CldImage className='rounded-xl w-full h-full' width={300} height={300} src={id} alt="Imagen Museo" />
            <h1>{name}</h1>
            <button onClick={() => router.push(`/${deleteSpace(name)}`)} className='w-full h-12 bg-btnForm text-white font-bold text-lg rounded-xl hover:bg-btnFormHover transition' >
              Ir al museo
            </button>
            </div>
          </div>
        )
      })
      }
     </div> 
    </div>
  )
}

export default Colecciones