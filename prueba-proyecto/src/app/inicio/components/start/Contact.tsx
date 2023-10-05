import dir_url from '@/lib/url'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

const Contacto = () => {

  const { data: sessionData } = useSession()

  const [message, setMessage] = useState('')

  const toastNotLogged = () => {
    toast('Aún no estás loggeado', {
      icon: "❌",
      style: {
        background: 'white',
        color: 'black',
        fontWeight: '600',
        padding: '10px'
      },
      duration: 2000,
      position: 'bottom-right',

    });
  }

  const toastMessageSuccess = () => {
    toast('Mensaje enviado', {
      icon: "✔️",
      style: {
        background: 'white',
        color: 'black',
        fontWeight: '600',
        padding: '10px'
      },
      duration: 2000,
      position: 'bottom-right',
    });
  }

  const SendForm = async (e: any) => {
    e.preventDefault()
    if (sessionData?.user.id === undefined) {
      toastNotLogged()
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
          toastMessageSuccess()
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

    <div className='flex w-full h-[500px] md:w-4/5 justify-center items-center flex-col md:flex-row gap-4'>
      <div className='flex w-full h-2/3 md:h-2/3 md:w-1/2 justify-center items-center flex-col gap-4'>
        <h1 className='text-3xl font-bold'>Mensaje:</h1>
        <form onSubmit={SendForm} action="" className='w-4/5 h-3/4 flex justify-start items-center flex-col bg-black rounded-md'>
          <textarea onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => setMessage(ev.target.value)} value={message} autoComplete='off' name='message' id='message' placeholder='Mensaje' className='w-full h-3/4 p-4 bg-transparent text-white border-white border-b-2 text-left resize-none focus:outline-none'></textarea>
          <div className='flex justify-center items-center w-24 h-1/4'>
            <button className='w-full h-12 text-black bg-white font-semibold rounded-full hover:scale-95 transition'>Enviar</button>
          </div>
        </form>
      </div>
      <div className='flex justify-center items-center w-4/5 md:h-full md:w-1/3'>
        <h1 className='w-full text-black font-bold text-lg text-center'>Se parte de nuestra red de museos y galerias artisticas</h1>
      </div>
    </div>
  )
}

export default Contacto