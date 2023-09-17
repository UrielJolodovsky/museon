'use client'

import dir_url from '@/lib/url'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState, MouseEvent, useContext, createContext } from 'react'
import { toast } from 'react-hot-toast'
import { EventsProps } from '@/types'
import { CldImage } from 'next-cloudinary'
import useUsuario from '@/hooks/useUsuario'
import { usuarioProps } from '@/types'
import ModalEvent from './ModalEvent'
import ReactDOM from 'react-dom'
import { EventContext, EventProvider } from '@/context/EventContext'
import { time } from 'console'
import { useRouter } from 'next/navigation'


const eventos = () => {
  const [events, setEvents] = useState<EventsProps[]>([])
  const [tipo_usuario, setTipo_usuario] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { eventoEnviado, setEventoEnviado } = useContext(EventContext)
  const router = useRouter()


  useUsuario().then((res) => {
    setTipo_usuario(res)
  })

  useEffect(() => {
    router.push('/Eventos')
    GetEventos()
    setEventoEnviado(false)
  }, [eventoEnviado])

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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

  return (
    <EventProvider>
      <section className='flex justify-center items-center w-full h-full pt-16'>
        <div className='w-full h-auto flex justify-center items-center flex-col gap-10'>
          <div className='h-1/2 flex items-center justify-center gap-5'>
            <h1 className='text-2xl font-semibold text-center'>Eventos:</h1>
            {tipo_usuario === 'museo' ? (
              <button id='addEvent' onClick={openModal} className='w-12 h-12 text-5xl rounded-xl text-white font-semibold bg-dashHover'>+</button>

            ) : ''}
          </div>
          <div id='container-events' className='w-2/3 h-1/2 xl:w-11/12 gap-8 flex justify-center flex-col-reverse p-8'>
            {modalIsOpen && ReactDOM.createPortal(
              <ModalEvent isOpen={modalIsOpen} onClose={closeModal} />,
              document.getElementById('container-events') as HTMLElement
            )}
            {Array.isArray(events) ? events.map((evento, index) =>
              <div className='h-[200px] w-full bg-dashHover p-8 rounded-md flex flex-row justify-start items-center gap-10 ' key={index}>
                <div className='w-[150px] h-[150px] bg-white flex justify-start items-center rounded-lg'>
                  <CldImage width={0} height={0} className='w-full h-full' src={evento["id"]} alt='EventImage' />
                </div>
                <div className='w-2/3 h-full flex flex-col gap-5'>
                  <div className='w-full h-2/3 flex flex-row justify-start items-center'>
                    <div className='w-auto h-full flex flex-row justify-center items-center gap-4 '>
                      <h1 className='text-gray w-1/2 font-normal text-center'>{evento["author"]["name"]}</h1>
                      <span className='bg-gray w-[1px] rounded-xl h-6'></span>
                      <h3 className='text-gray w-1/2  borderfont-normal text-center'>Fecha</h3>
                    </div>
                  </div>
                  <div className='w-full  h-full flex flex-row'>
                    <h4 className='text-black font-normal w-1/2 whitespace-normal break-words '>{evento["content"]}</h4>
                  </div>
                </div>
              </div>

            ) : ''}
          </div>
        </div>
      </section>
    </EventProvider>
  )
}

export default eventos