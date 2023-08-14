import dir_url from '@/lib/url'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

const Contacto = () => {

  const { data: sessionData } = useSession()

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
          setMessage('')
        }).catch((err) => {
          toast.error(err.response.data)
        })
      } catch (error) {
        toast.error("Something went wrong")
      }
    }

    setMessage('')
  }


  return (
    <div className='flex w-1/2 h-full justify-center items-center flex-col gap-2'>
        <h1 className='text-3xl font-bold'>Mensaje:</h1>
        <form onSubmit={SendForm} action="" className='w-4/5 h-3/4 gap-3 flex justify-center items-center flex-col bg-black rounded-md'>
          <textarea onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => setMessage(ev.target.value)} value={message} autoComplete='off' name='message' id='message' placeholder='Mensaje' className='w-full h-3/4 p-3 bg-transparent text-white border-white border-b-2 text-left resize-none focus:outline-none'></textarea>
          <button className='w-24 h-12 text-black bg-white font-semibold rounded-full'>Enviar</button>
        </form>
    </div>
  )
}

export default Contacto