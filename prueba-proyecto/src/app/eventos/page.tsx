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
import { toastComentarioError, toastError } from '@/context/ToasterContext'
import useEvents from '@/hooks/useEvents'


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
    router.push('/eventos')
    useEvents().then((res) => setEvents(res))
  }, [])

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



  // const GetEventos = async () => {
  //   try {
  //     await axios.get(`${dir_url}/api/eventos/get`).then((res) => {
  //       setEvents(res.data)
  //       console.log(res.data)
  //     }).catch((err) => {
  //       toastError(err.response.data)
  //     })
  //   } catch (error) {
  //     toastComentarioError()
  //   }
  // }

  return (
    <EventProvider>
      <section className='flex justify-center items-center w-full h-full pt-16'>
        <div className='w-full h-full flex justify-center items-center flex-col md:gap-10 '>
          <div className='h-1/2 flex items-center justify-center gap-5'>
            <h1 className='text-2xl font-semibold text-center'>Eventos</h1>
            {tipo_usuario === 'museo' ? (
              <button id='addEvent' onClick={openModal} className='w-12 h-12 text-5xl rounded-xl text-white font-semibold bg-dashHover'>+</button>
            ) : ''}
          </div>
          <div id='container-events' className='md:w-4/5 w-full h-1/2 gap-5 flex justify-center flex-col-reverse p-8'>
            {modalIsOpen && ReactDOM.createPortal(
              <ModalEvent isOpen={modalIsOpen} onClose={closeModal} />,
              document.getElementById('container-events') as HTMLElement
            )}
            {Array.isArray(events) ? events.map((evento, index) =>
              <div className='h-[550px] md:h-[300px] w-full bg-dashHover p-8 rounded-md flex flex-col md:flex-row md:justify-start justify-center items-center md:gap-10 gap-5 ' key={index}>
                <div className='w-[200px] h-[200px] bg-white flex md:justify-start justify-center md:items-start items-center rounded-lg'>
                  <CldImage width={0} height={0} className='w-full h-full' src={evento["id"]} alt='EventImage' />
                </div>
                <div className='md:w-2/3 w-full h-[200px] flex flex-col md:justify-start justify-center items-center md:gap-5'>
                  <div className='w-full h-2/3 flex flex-row md:justify-start justify-center items-center'>
                    <div className='w-auto h-full flex flex-row justify-center items-center gap-4 '>
                      <h1 className='text-gray w-1/3 font-normal text-center'>{evento["author"]["name"]}</h1>
                      <span className='bg-gray w-[1px] rounded-xl h-6'></span>
                      <h3 className='text-gray w-2/3  borderfont-normal text-center'>{evento["createdAt"].substring(0, 10)}</h3>
                    </div>
                  </div>
                  <div className='w-full h-full flex flex-col md:justify-start justify-center gap-3'>
                    <h4 className='text-black md:text-start text-center text-2xl font-normal md:w-1/2 w-full whitespace-normal break-words '>{evento["content"]}</h4>
                    <h5 className='text-black md:text-start text-center font-normal w-full whitespace-normal break-words '>{evento["description"]}</h5>
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