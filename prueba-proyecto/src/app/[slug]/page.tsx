'use client'
import axios from 'axios'
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState, MouseEvent } from "react"
import { toast } from "react-hot-toast"
import { CommentsProps, LikesProps, MuseosProps } from '@/types'
import dir_url from '@/lib/url'
import Comp3d from '@/3dComps/Comp3d'
import internet from '@../../public/assets/icons/internet.png'
import instagram from '@/../../public/assets/FooterIcon/insta.png'
import twitter from '@/../../public/assets/FooterIcon/twitter.png'
import face from '@/../../public/assets/FooterIcon/face.png'
import Image from 'next/image'
import Scene from '@/three-js/Scene'


export default function Museo() {

    const [message, setMessage] = useState('')
    const [museos, setMuseos] = useState<MuseosProps[]>([])
    const [messages, setMessages] = useState<CommentsProps[]>([])
    const [likes, setLikes] = useState<LikesProps[]>([])
    const params = useParams()
    const MuseoName = params.slug.toString().replace('-', ' ')
    const [isUrl, setIsUrl] = useState<Boolean>(false)

    const toastComentarioError = () => {
        toast('Ha ocurrido un error', {
            icon: "❌",
            style: {
                background: 'white', // Cambia el color de fondo
                color: 'black',
                fontWeight: '600',
                padding: '10px'// Cambia el color del texto
            },
            duration: 2000, // Establece la duración en milisegundos
            position: 'bottom-right', // Cambia la posición de la notificación
            // Puedes agregar más opciones según tus necesidades
        });
    }
    const toastSuccess = (text: string) => {
        toast(`${text}`, {
            icon: "✔️",
            style: {
                background: 'white', // Cambia el color de fondo
                color: 'black',
                fontWeight: '600',
                padding: '10px'// Cambia el color del texto
            },
            duration: 2000, // Establece la duración en milisegundos
            position: 'bottom-right', // Cambia la posición de la notificación
            // Puedes agregar más opciones según tus necesidades
    })
    }
    const toastComentarioEnviado = () => {
        toast('Comentario enviado con éxito', {
            icon: "✔️",
            style: {
                background: 'white', // Cambia el color de fondo
                color: 'black',
                fontWeight: '600',
                padding: '10px'// Cambia el color del texto
            },
            duration: 2000, // Establece la duración en milisegundos
            position: 'bottom-right', // Cambia la posición de la notificación
            // Puedes agregar más opciones según tus necesidades
        });
    }


    const [messageEnviado, setMessageEnviado] = useState(false)

    useEffect(() => {
        getMessages()
        setMessageEnviado(false)
        verifyUrl()
        getLikes()
    }, [messageEnviado])


    const verifyUrl = async () => {
        try {
            await axios.post(`${dir_url}/api/verifyMuseoName`, {
                name_museo: MuseoName
            }).then((res) => {
                setIsUrl(res.data)
                console.log(res.data, 'res')
            }).catch((err) => {
                toast.error(err.response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const addMessage = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            await axios.post(`${dir_url}/api/comments/add`, {
                message: message,
                nameMuseo: params.slug.toString()
            }).then((res) => {
                setMessage('')
                toastComentarioEnviado()
                setMessageEnviado(true)
                setMessages(res.data)
            }).catch((err) => {
                toastComentarioError()
            })
        } catch (err) {
            toastComentarioError()
        }
    }
    const AddDeleteLike = async (event: MouseEvent<HTMLButtonElement>, id_comment: string) => {
        event.preventDefault()
        try {
            await axios.post(`${dir_url}/api/comments/likes/add`, {
                id_comment: id_comment
            }).then((res) => {
                toastSuccess(res.data)
            }).catch((err) => {
                toastComentarioError()
            })
        } catch (err) {
            toastComentarioError()
        }
    }

    const getLikes = async () => {
        try {
            await axios.get(`${dir_url}/api/likes/get`).then((res) => {
                setLikes(res.data)
            }).catch((err) => {
                toastComentarioError()
            })
        } catch (err) {
            toastComentarioError()
        }
    }

    const getMessages = async () => {
        try {
            await axios.post(`${dir_url}/api/comments/get`, {
                parametros: params.slug.toString()
            }).then((res) => {
                setMessages(res.data)
            }).catch((err) => {
                toastComentarioError()
            })
        } catch (err) {
            toastComentarioError()
        }
    }

    const CompIcon = [
        {
            id: 1,
            icon: internet,
        },
        {
            id: 2,
            icon: instagram,
        },
        {
            id: 3,
            icon: twitter,
        },
        {
            id: 4,
            icon: face,
        }

    ]

    return (
        <>
            {isUrl === true ? (
                <section className='w-full h-[1200px] flex flex-col gap-20'>
                    <div className='w-full h-4/6 flex flex-col gap-6 pt-10'>
                        <div className='h-4/6 flex justify-center items-center pb-20'>
                            <h1 className=' text-4xl font-bold text-center'>Museos</h1>
                        </div>
                        <div className='w-full h-[500px] flex justify-center items-center'>
                            <Scene />
                        </div>
                    </div>
                    <div className='flex justify-center items-center flex-col '>
                        <h1 className='h-1/6 text-black font-medium '>{messages.length} Comentarios</h1>
                        <div className=' w-[1000px] h-5/6 flex justify-center items-center gap-10 flex-col'>
                            <form className='flex w-full flex-row gap-5'>
                                <input value={message} className="w-11/12 border-b-2 focus:border-0" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                                <button type='submit' className="bg-dashHover w-1/12 h-12 rounded-lg font-bold" onClick={addMessage}>Add</button>
                            </form>
                            <div className='w-full  flex justify-center items-start flex-col gap-4 '>
                                {Array.isArray(messages) ? messages.map((museo, index) =>
                                    <div className=' w-full h-auto flex justify-center items-start flex-col gap-2 p-10 rounded-lg' key={index}>
                                        <h2 className='text-center font-bold text-black'>@{museo["author"]["name"]}</h2>
                                        <h1 className='text-center text-black'>{museo["content"]}</h1>
                                        <button className='bg-dashHover w-1/12 h-12 rounded-lg font-bold' onClick={(event: MouseEvent<HTMLButtonElement>) => {AddDeleteLike(event, museo['id'])}}>Like</button>
                                    </div>
                                ) : ""}
                            </div>
                        </div>
                    </div>
                </section>
            ) : ''}

        </>
    )
}