import { EventContext, EventProvider } from '@/context/EventContext'
import { toastSuccess } from '@/context/ToasterContext'
import useUsuario from '@/hooks/useUsuario'
import dir_url from '@/lib/url'
import { EventsProps } from '@/types'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState, MouseEvent, useContext } from 'react'
import toast from 'react-hot-toast'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


const ModalEvent: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [events, setEvents] = useState<EventsProps[]>([])
  const [tipo_usuario, setTipo_usuario] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { eventoEnviado, setEventoEnviado } = useContext(EventContext)


  useEffect(() => {
    setEventoEnviado(false)
  }, [eventoEnviado])

  useUsuario().then((res) => {
    setTipo_usuario(res)
  })

  const delaySend = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  const AddEvent = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await axios.post(`${dir_url}/api/eventos/add`, {
        content: content,
        description: description
        //Hay que agregar el campo de fecha
        // fecha: fecha
      }).then((res) => {
        console.log(res.data)
        setEvents(res.data)
        const id_public = res.data
        setContent('')
        setDescription('')
        const formData = new FormData()
        formData.append('file', selectedFile as Blob | string)
        formData.append('upload_preset', 'museon')
        formData.append('public_id', id_public)
        axios.post('https://api.cloudinary.com/v1_1/dxt2lvdt3/image/upload', formData)
        setEventoEnviado(true)
        onClose();
        toastSuccess('Evento creado con éxito')
        delaySend()
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
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
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
    <motion.div
      id='modal'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='w-full bg-dashHover rounded-md flex flex-row p-8 '>
      <form id='modal' className='w-full h-full flex flex-col justify-center items-end'>
        <div className='w-full h-2/3 flex flex-row justify-start items-center gap-16'>
          <label htmlFor="file-input" className='w-[150px] h-[150px] bg-white cursor-pointer rounded-xl'>
            <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} onChange={handleChange} id="file-input" type="file" accept="image/*" className="hidden" />
            {selectedImage && (
              <div>
                <motion.img animate={{ opacity: 1 }} initial={{ opacity: 0 }} src={selectedImage} alt="Imagen seleccionada" className='bg-contain bg-center w-[150px] h-[150px] ' />
              </div>
            )}
          </label>
          <div className='w-2/3 h-1/3 flex justify-center items-start flex-col gap-4'>
            <motion.input
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              type='text'
              className='outline-none w-full h-10 border-b-[1px] bg-transparent'
              placeholder='Título...'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
            />
            <motion.input
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              type='text'
              className='outline-none w-full h-10 border-b-[1px] bg-transparent'
              placeholder='Descripción...'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            />
            <div className='w-full h-16 flex flex-row gap-10 pt-8'>
              <motion.button animate={{ opacity: 1 }} initial={{ opacity: 0 }} type='submit' onClick={AddEvent} className='w-24 h-12 bg-black rounded-full text-white'>Publicar</motion.button>
              <motion.button animate={{ opacity: 1 }} initial={{ opacity: 0 }} className='w-24 h-12 text-black text-center rounded-full border-2' onClick={onClose} >Cancelar</motion.button>
            </div>
          </div>
        </div>
      </form>
    </motion.div >
  )
}

export default ModalEvent