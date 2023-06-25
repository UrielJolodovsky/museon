'use client'
import axios from "axios"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import NextAuthProvider from "../layout"

export default function Museo() {
    
    const [message, setMessage] = useState('')
    const params = useParams()
    const [messageEnviado , setMessageEnviado] = useState(false)
    useEffect(() => {
        getMessages()
        setMessageEnviado(false)
    }, [messageEnviado])

    const getMessages = async () => {
        try{
        await axios.post('http://localhost:3000/api/comments/get', {
            parametros: params.slug.toString()
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data)
          })
        } catch(err) {
            console.log(err)
        }
    }
    const addMessage = async () => {
        try {
            await axios.post('http://localhost:3000/api/comments/add', {
                message: message,
                museoId: params.slug.toString()
            }).then((res) => {
                console.log(res.data)
                toast.success(res.data)
                setMessageEnviado(true)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data)
              })
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
          <div className='w-full h-screen flex flex-col bg-dashBack'>
        <h1>Holaaa!</h1>
        <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}/>
        <button onClick={addMessage}>Add</button>
          </div>
      </>
    )
}