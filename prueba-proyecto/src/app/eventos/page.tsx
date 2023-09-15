'use client'

import dir_url from '@/lib/url'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState, MouseEvent, useContext } from 'react'
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
    document.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('events-container') as HTMLElement;
      const popup = document.getElementById('popup') as HTMLElement;
      console.log(popup)
      container.appendChild(popup);
    });
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
      <section className='flex justify-center items-center w-full h-auto pt-32'>
        <div className='w-full h-auto flex justify-center items-center flex-col gap-10'>
          <div>
            {tipo_usuario === 'museo' ? (
              <div className='w-full h-24 flex justify-center items-center gap-10'>
                <h1 className='text-2xl font-semibold text-center'>Eventos:</h1>
                <button onClick={openModal} className='w-12 h-12 rounded-xl bg-dashBack text-4xl '>+</button>
                {modalIsOpen && ReactDOM.createPortal(
                  <ModalEvent isOpen={modalIsOpen} onClose={closeModal} />,
                  document.body
                )}
              </div>
            ) : 
            <h1 className='text-2xl font-semibold text-center'>Eventos:</h1> }
          </div>
          <div id='events-container' className='w-2/3 xl:w-11/12 h-full gap-8 mb-10 flex justify-center flex-col-reverse p-8'>
            {Array.isArray(events) ? events.map((evento, index) =>
              <div className='h-1/3 w-full bg-dashHover p-4 rounded-md flex flex-row ' key={index}>
                <div className='w-1/3 h-full'>
                  <CldImage width={200} height={200} className='w-32 h-32' src={evento["id"]} alt='EventImage' />
                </div>
                <div className='w-2/3 h-full flex flex-col gap-5'>
                  <div className='w-1/2 h-2/3 flex flex-row justify-start items- gap-2'>
                    <h1 className='text-grey w-1/4 border-r-2 font-normal text-start'>{evento["author"]["name"]}</h1>
                    <h3 className='text-grey w-1/4 pr-2 font-normal text-start'>Fecha</h3>
                  </div>
                  <div className='w-full  h-full flex flex-row '>
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