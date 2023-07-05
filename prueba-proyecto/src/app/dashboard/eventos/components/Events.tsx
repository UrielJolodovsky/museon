'use client'

import dir_url from '@/lib/url'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { EventsProps } from '@/types'
import Image from 'next/image'
import { AiOutlinePlusSquare } from 'react-icons/ai'



const Events = () => {
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [events, setEvents] = useState<EventsProps[]>([])
  const [eventoEnviado, setEventoEnviado] = useState(false)

  useEffect(() => {
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

  const AddEvent = async () => {
    try {
      await axios.post(`${dir_url}/api/eventos/add`, {
        content: content,
      }).then((res) => {
        console.log(res.data)
        const id_public = res.data
        toast.success('Event created succesfully')
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'museon')
        formData.append('public_id', id_public)
        axios.post('https://api.cloudinary.com/v1_1/dxt2lvdt3/image/upload', formData)
        setEvents(res.data)
      }).catch((err) => {
        toast.error(err.response.data)
      })
    } catch (error) {
      toast.error("Something went wrong")
    }
    setEventoEnviado(true)

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
            <label htmlFor="upload-input" className='relative cursor-pointer'>
              <span className=''><i ><AiOutlinePlusSquare className='w-6 h-6' /></i></span>
              <input id="upload-input" type="file" onChange={handleChange} className="hidden" />
            </label>
          </div>
          <button type='submit' onClick={AddEvent} className='w-16 h-12 bg-white border-2 '>Enviar</button>
        </form>
        <div className='overflow-auto bg-formBack w-[38rem] h-48'>
          {Array.isArray(events) ? events.map((evento, index) =>
            <div key={index}>
              <h1>{evento["author"]["name"]}</h1>
              <h2>{evento["content"]}</h2>
            </div>
          ) : ''}
        </div>
      </div>
    </section>
  )
}

export default Events