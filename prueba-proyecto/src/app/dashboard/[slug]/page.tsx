'use client'
import axios from 'axios'
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { CommentsProps, MuseosProps } from '@/types'
import NextAuthProvider from "../layout"

export default function Museo() {

    const [message, setMessage] = useState('')
    const [museos, setMuseos] = useState<MuseosProps[]>([])
    const [messages, setMessages] = useState<CommentsProps[]>([])
    const params = useParams()
    const [messageEnviado, setMessageEnviado] = useState(false)

    useEffect(() => {
        console.log(params.slug)
        console.log(messages)
        getInfoMuseo()
        getMessages()
        setMessageEnviado(false)
    }, [messageEnviado])

    const addMessage = async () => {
        try {
            await axios.post('http://localhost:3000/api/comments/add', {
                message: message,
                museoId: params.slug.toString()
            }).then((res) => {
                console.log(res.data)
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
            await axios.post('http://localhost:3000/api/comments/get', {
                parametros: params.slug.toString()
            }).then((res) => {
                console.log(res.data)
                setMessages(res.data)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const getInfoMuseo = async () => {
        try {
            await axios.get(`http://localhost:3000/api/museos`).then((res) => {
                setMuseos(res.data)
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <section className="w-full h-screen flex justify-center items-center">
                {/*museos.map(({ id, name }) => (
                    id === params.slug && (
                        <div key={id}>
                    <h1>{name}</h1>     
                </div>
                    )
                ))*/}
                <div className="bg-formBack w-1/2 h-96 flex justify-center items-center flex-col gap-4 rounded-lg">
                    <h1 className="text-3xl font-bold text-white">Holaaaaaa</h1>
                    <input className="bg-white border-black" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                    <button type='submit' className="bg-dashBack w-28 h-8 rounded-lg font-bold" onClick={addMessage}>Add</button>
                </div>
                <div className="bg-dashBack w-1/2 h-96 flex justify-center items-center">
                {messages.map((museo) => 
                        <div>
                            <h1>{museo["author"]["name"]}</h1>
                        </div>
                    )}
                </div>

            </section>
        </>
    )
}