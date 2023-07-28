'use client'
import axios from 'axios'
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState, MouseEvent } from "react"
import { toast } from "react-hot-toast"
import { CommentsProps, MuseosProps } from '@/types'
import dir_url from '@/lib/url'
import Comp3d from '@/3dComps/Comp3d'
import internet from '@../../public/assets/icons/internet.png'
import instagram from '@/../../public/assets/FooterIcon/insta.png'
import twitter from '@/../../public/assets/FooterIcon/twitter.png'
import face from '@/../../public/assets/FooterIcon/face.png'
import Image from 'next/image'


export default function Museo() {

    const [message, setMessage] = useState('')
    const [museos, setMuseos] = useState<MuseosProps[]>([])
    const [messages, setMessages] = useState<CommentsProps[]>([])
    const params = useParams()
    const [messageEnviado, setMessageEnviado] = useState(false)

    useEffect(() => {
        getMessages()
        setMessageEnviado(false)
    }, [messageEnviado])

    const addMessage = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            await axios.post(`${dir_url}/api/comments/add`, {
                message: message,
                museoId: params.slug.toString()
            }).then((res) => {
                toast.success(res.data)
                setMessageEnviado(true)
                setMessages(res.data)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const getMessages = async () => {
        try {
            await axios.post(`${dir_url}/api/comments/get`, {
                parametros: params.slug.toString()
            }).then((res) => {
                setMessages(res.data)
            }).catch((err) => {
                toast.error(err.response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const CompIcon = [
        {
            id: 1,
            icon: internet,
            className: 'bg-black'

        },
        {
            id: 2,
            icon: instagram,
            className: 'bg-black'

        },
        {
            id: 3,
            icon: twitter,
            className: 'bg-black'

        },
        {
            id: 4,
            icon: face,
            className: 'bg-black'
        },

    ]

    return (
        <>
            <section className="w-full h-screen flex justify-center items-center flex-col">
                <div className='w-full h-[1200px] flex justify-center items-center flex-col p-20'>
                    <div className='w-full h-1/3 flex justify-center items-center flex-col pt-16'>
                        <h1 className='text-4xl font-bold text-center'>Museos</h1>
                        <div className='w-full h-1/2 flex justify-center items-center'>
                            {CompIcon.map(({ id, icon }) => {
                                return (
                                    <Image
                                        key={id}
                                        src={icon}
                                        alt='icon'
                                        className='w-[30px] h-[30px]'
                                    >
                                    </Image>
                                )
                            })}
                        </div>
                    </div>
                    <div className='w-[800px] h-2/3 flex justify-center items-center'>
                        <Comp3d />
                    </div>
                </div>
                <div className='w-full h-[600px] flex justify-center items-center flex-col bg-black'>
                </div>
            </section>
        </>
    )
}