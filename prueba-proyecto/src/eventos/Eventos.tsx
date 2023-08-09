'use client'

import dir_url from '@/lib/url'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState, MouseEvent } from 'react'
import { toast } from 'react-hot-toast'
import { EventsProps } from '@/types'
import { CldImage } from 'next-cloudinary'
import useUsuario from '@/hooks/useUsuario'
import { usuarioProps } from '@/types'


const eventos = () => {
  const [content, setContent] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [events, setEvents] = useState<EventsProps[]>([])
  const [eventoEnviado, setEventoEnviado] = useState(false)
  const [tipo_usuario, setTipo_usuario] = useState("")

  useUsuario().then((res) => {
    setTipo_usuario(res)
  })

  useEffect(() => {
    GetEventos()
    setEventoEnviado(false)
  }, [eventoEnviado])

  const GetEventos = async () => {
    try {
      await axios.get(`${dir_url}/api/eventos/get`).then((res) => {
        setEvents(res.data)
      }).catch((err) => {
        toast.error(err.response.data)
      })
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const AddEvent = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await axios.post(`${dir_url}/api/eventos/add`, {
        content: content,
      }).then((res) => {
        console.log(res.data)
        setEventoEnviado(true)
        setEvents(res.data)
        const id_public = res.data
        toast.success('Event created succesfully')
        const formData = new FormData()
        formData.append('file', selectedFile as Blob | string)
        formData.append('upload_preset', 'museon')
        formData.append('public_id', id_public)
        axios.post('https://api.cloudinary.com/v1_1/dxt2lvdt3/image/upload', formData)
      }).catch((err) => {
        toast.error(err.response.data)
      })
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList = (event.target as EventTarget & { files: FileList }).files;

    if (files && files.length > 0) {
      const file: File = files[0]
      setSelectedFile(file)

      const reader = new FileReader()
      reader.onload = () => {
        const content: string = reader.result as string
        console.log(content)
      }
      reader.readAsText(file)
    }
  };



  return (
    <section className='flex justify-center items-center w-full h-auto'>
      <div className='w-full h-auto flex justify-center items-center flex-col'>
        {tipo_usuario === 'museo' ? (
          <form className='w-[38rem] h-[20rem] bg-dashBack flex flex-col p-5 gap-6 items-end'>
            <div className='w-full h-10 flex flex-row justify-center items-start gap-4'>
              <input type='text' className='outline-none border-b-2 w-64 h-5' onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)} />
              <input type="file" onChange={handleChange} className=" " />
            </div>
            <button type='submit' onClick={AddEvent} className='w-16 h-12 bg-white border-2 '>Enviar</button>
          </form>
        ) : ''}
        <div className='border-2 w-2/3 h-full gap-8 mt-10 mb-10 flex justify-center flex-col-reverse p-8'>
          <h1 className='text-2xl font-semibold text-center'>Eventos:</h1>
          {Array.isArray(events) ? events.map((evento, index) =>
            <div className='h-1/3 w-full bg-dashHover p-4 rounded-md flex flex-row ' key={index}>
              <div className='w-1/3 h-full'>
                <CldImage width={200} height={200} className='w-32 h-32' src={evento["id"]} alt='EventImage' />
              </div>
              <div className='w-2/3 h-full flex flex-row'>
                <h1 className='text-black w-1/2'>{evento["author"]["name"]}</h1>
                <h2 className='text-black font-bold w-1/2 whitespace-normal break-words '>{evento["content"]}</h2>
              </div>
            </div>

          ) : ''}
        </div>
      </div>
    </section>
  )
}

export default eventos