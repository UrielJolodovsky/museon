import dir_url from '@/lib/url'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

const contacto = () => {

const {data: sessionData} = useSession()
  const [message, setMessage] = useState('')
  const SendForm = async (e: any) => {
    e.preventDefault()
    if (sessionData?.user.id === undefined) {
      toast.error("You are not logged in")
    }
    else if (message.length === 0) {
      toast.error("Your message is empty")
    }
    else {
      try {
      axios.post(`${dir_url}/api/contacto`, {
        message: message,
        user: sessionData.user.name,
        email: sessionData.user.email
      }).then((response) => {
        toast.success(response.data)
      }).catch((err) => {
        toast.error(err.response.data)
      })
    } catch(error) {
      toast.error("Something went wrong")
    }
    }
  }


  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='flex w-2/3 h-2/3 justify-start items-center flex-col gap-10 '>
      <h1 className='text-3xl font-bold'>Comunicate con nuestro equipo</h1>
      <form onSubmit={SendForm} action="" className='w-1/2 h-full flex justify-center items-center  bg-black p-10'>
        <textarea onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => setMessage(ev.target.value)} autoComplete='off' name='message' id='message' placeholder='Mensaje' className='w-2/3 h-2/3 p-3 bg-transparent text-white border-white border-2 text-left pt-3 resize-none'></textarea>
        <button className='w-12 h-12 text-white'>Enviar</button>
      </form>
      </div>
    </div>
  )
}

export default contacto