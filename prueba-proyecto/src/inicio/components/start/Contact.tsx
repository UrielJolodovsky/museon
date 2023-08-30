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

    <div className='flex w-full h-[500px] xl:w-full lg:w-full md:w-full sm:w-full lg:h-[550px] md:h-[450px] sm:h-[550px] justify-center items-center xl:flex-row lg:flex-row md:flex-col sm:flex-col sm:gap-4'>
      <div className='flex w-1/4 xl:w-2/5 lg:w-2/3 md:w-full sm:w-full h-[400px] lg:h-[350px] md:h-[400px] sm:h-2/3 justify-center items-center flex-col gap-4'>
        <h1 className='text-3xl font-bold'>Mensaje:</h1>
        <form onSubmit={SendForm} action="" className='w-5/6 h-3/4 md:w-full flex justify-start items-center flex-col bg-black rounded-md'>
          <textarea onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => setMessage(ev.target.value)} value={message} autoComplete='off' name='message' id='message' placeholder='Mensaje' className='w-full h-3/4 p-4 bg-transparent text-white border-white border-b-2 text-left resize-none focus:outline-none'></textarea>
          <div className='flex justify-center items-center w-24 h-1/4'>
            <button className='w-full h-12 text-black bg-white font-semibold rounded-full hover:scale-95 transition'>Enviar</button>
          </div>
        </form>
      </div>
      <div className='flex justify-center items-center w-1/4 xl:2/3 lg:w-1/2 md:full sm:w-full sm:px-10'>
        <h1 className='text-black font-bold text-2xl lg:text-2xl md:text-2xl sm:text-base text-center'>Se parte de nuestra red de museos y galerias artisticas</h1>
      </div>
    </div>
  )
}

export default Contacto