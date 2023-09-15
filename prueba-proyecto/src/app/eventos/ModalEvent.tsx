import { EventContext, EventProvider } from '@/context/EventContext'
import { StateContext } from '@/context/StateContext'
import useUsuario from '@/hooks/useUsuario'
import dir_url from '@/lib/url'
import { EventsProps } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState, MouseEvent, useContext } from 'react'
import toast from 'react-hot-toast'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalEvent: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [events, setEvents] = useState<EventsProps[]>([])
  const [tipo_usuario, setTipo_usuario] = useState("")
  const { eventoEnviado, setEventoEnviado } = useContext(EventContext)


  useEffect(() => {
    setEventoEnviado(false)
  }, [eventoEnviado])

  useUsuario().then((res) => {
    setTipo_usuario(res)
  })

  const AddEvent = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await axios.post(`${dir_url}/api/eventos/add`, {
        content: content,
      }).then((res) => {
        console.log(res.data)
        setEvents(res.data)
        const id_public = res.data
        toast.success('Event created succesfully')
        setContent('')
        const formData = new FormData()
        formData.append('file', selectedFile as Blob | string)
        formData.append('upload_preset', 'museon')
        formData.append('public_id', id_public)
        axios.post('https://api.cloudinary.com/v1_1/dxt2lvdt3/image/upload', formData)
        setEventoEnviado(true)
        onClose();
      }).catch((err) => {
        toast.error(err.response.data)
      })
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  if (!isOpen) return null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList = (event.target as EventTarget & { files: FileList }).files;

    if (files && files.length > 0) {
      const file: File = files[0]
      setSelectedFile(file)

      const reader = new FileReader()
      reader.onload = () => {
        const content: string = reader.result as string
        console.log(content)
      }
      reader.readAsText(file)
    }
  };

  return (
    <div id='popup' className='w-80 h-48 flex items-center justify-center '>
      <form className='w-[38rem] h-full bg-dashBack flex flex-col p-5 gap-6 items-end'>
        <div className='w-full h-10 flex flex-row justify-center items-start gap-4'>
          <input type='text' value={content} className='outline-none border-b-2 w-64 h-5' onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)} />
          <input type="file" onChange={handleChange} className=" " />
        </div>
        <button type='submit' onClick={AddEvent} className='w-16 h-12 bg-white border-2 '>Enviar</button>
        <button className='w-12 h-12' onClick={onClose} >Cerrar</button>
      </form>
    </div >
  )
}

export default ModalEvent