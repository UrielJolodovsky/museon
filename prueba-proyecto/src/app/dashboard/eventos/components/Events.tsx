'use client'

import dir_url from '@/lib/url'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { EventsProps } from '@/types'

const Events = () => {
  const [image, setImage] = useState('')
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
        console.log(res.data)
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
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList = (event.target as EventTarget & { files: FileList }).files;
    
    if (files && files.length > 0) {
      const selectedFile: File = files[0];
      // Hacer algo con el archivo seleccionado
      setSelectedFile(selectedFile);
    }
  };  
  
  return (
    <div className='flex justify-center items-center w-full h-screen pt-10 '>
       <div className=' w-full h-screen flex justify-center items-center flex-col'>
       <form className='w-[48rem] h-screen bg-dashBack flex flex-col p-5 gap-6'>
           <input type='text' className=' outline-none border-b-2' onChange={(e:  ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}/>
           <input type='file' onChange={handleChange}/>
           <button onClick={AddEvent} className='w-16 h-12 bg-white border-2 '>Enviar</button>    
        </form>
         <div>
          {Array.isArray(events) ? events.map((evento, index) =>
          <div key={index}>
            <h1>{evento["author"] ["name"]}</h1>
            <h2>{evento["content"]}</h2>
            <h4>{evento["createdAt"]}</h4>
          </div>
          ) : ''}
         </div>
        </div> 
    </div>
  )
}

export default Events