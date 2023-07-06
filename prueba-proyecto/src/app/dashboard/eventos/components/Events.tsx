'use client'

import dir_url from '@/lib/url'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState, MouseEvent } from 'react'
import { toast } from 'react-hot-toast'
import { EventsProps } from '@/types'
import { CldImage } from 'next-cloudinary'



const Events = () => {
  const [content, setContent] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [events, setEvents] = useState<EventsProps[]>([])
  const [eventoEnviado, setEventoEnviado] = useState(false)

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
    <section className='flex justify-center items-center w-full h-screen pt-10 '>
      <div className=' w-full h-screen flex justify-center items-center flex-col'>
        <form className='w-[38rem] h-[20rem] bg-dashBack flex flex-col p-5 gap-6 items-end'>
          <div className='w-full h-10 flex flex-row justify-center items-start gap-4'>
            <input type='text' className='outline-none border-b-2 w-64 h-5' onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)} />
              <input  type="file" onChange={handleChange} className=" " />
          </div>
          <button type='submit' onClick={AddEvent} className='w-16 h-12 bg-white border-2 '>Enviar</button>
        </form>
        <div className='overflow-auto bg-formBack w-[38rem] h-56'>
          {Array.isArray(events) ? events.map((evento, index) =>
            <div key={index}>
              <h1 className='text-white'>{evento["author"]["name"]}</h1>
              <h2 className='text-white font-bold'>{evento["content"]}</h2>
              <CldImage width={200} height={200} className='w-20 h-20' src={evento["id"]} alt='EventImage' />
            </div>
            
          ) : ''}
        </div>
      </div>
    </section>
  )
}

export default Events