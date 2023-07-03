'use client'

import dir_url from '@/lib/url'
import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

const Events = () => {
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')
  

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
      }).catch((err) => {
        toast.error(err.response.data)
      })
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  
  return (
    <div className='flex justify-center items-start w-full h-screen pt-10 '>
       <form className='w-[48rem] h-screen bg-dashBack flex flex-col p-5 gap-6'>
           <input type='file' onChange={(ev: any) => setImage(ev.target.files[0])}/>
           <input type='text' className=' outline-none border-b-2' onChange={(e:  ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}/>
           <button onClick={AddEvent} className='w-16 h-12 bg-white border-2 '>Enviar</button>    
        </form>
        <div className=''>
        
        </div> 
    </div>
  )
}

export default Events