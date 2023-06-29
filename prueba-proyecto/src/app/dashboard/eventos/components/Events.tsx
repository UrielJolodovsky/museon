'use client'

import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

const Events = () => {
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')
  

  const GetEventos = async () => {
    try {
      await axios.get('https://museon-proyecto.vercel.app/api/eventos/get').then((res) => {
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
      await axios.post('http://museon-proyecto.vercel.app/api/eventos/add', {
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
      }).catch((err) => {
        toast.error(err.response.data)
      })
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  
  return (
    <div className='flex justify-center items-start w-full h-screen pt-10'>
       <div className='w-96 h-12 bg-white'>
           <input type='file' onChange={(ev: any) => setImage(ev.target.files[0])}/>
           <input type='text' className='bg-red' onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}/>
           <button onClick={AddEvent}>Enviar</button>    
        </div> 
    </div>
  )
}

export default Events