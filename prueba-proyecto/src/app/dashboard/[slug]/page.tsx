'use client'
import axios from 'axios'
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState, MouseEvent } from "react"
import { toast } from "react-hot-toast"
import { CommentsProps, MuseosProps } from '@/types'
import dir_url from '@/lib/url'

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

    const getInfoMuseo = async () => {
        try {
            await axios.get(`${dir_url}/api/museos`).then((res) => {
                setMuseos(res.data)
            }).catch((err) => {
                toast.error(err.response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <section className="w-full h-screen flex justify-center items-center">
            
                <div className="bg-formBack w-1/3 h-full flex justify-center items-center flex-col gap-4">
                    <h1 className="text-3xl font-bold text-white">Envia un mensaje</h1>
                    <input className="bg-white border-black" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                    <button type='submit' className="bg-dashBack w-28 h-8 rounded-lg font-bold" onClick={addMessage}>Add</button>
                </div>
                <div className='w-2/3 h-screen bg-white flex justify-center items-center '>
                    <div className="bg-footerColor w-[600px] h-[600px] flex justify-center items-center flex-col gap-5" >
                    {Array.isArray(messages) ? messages.map((museo, index) =>  
                            <div className='bg-dashBack w-full h-52  flex justify-center items-center flex-row gap-10 p-5' key={index}>
                                <h2 className='text-center font-bold text-black'>Name: {museo["author"]["name"]}</h2>
                                <div className=''>
                                <h1 className='text-center text-black'>Contenido del mensaje: {museo["content"]}</h1>
                                </div>
                            </div>
                        ) : ""}
                    </div>
                </div>

            </section>
        </>
    )
}