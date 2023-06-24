'use client'
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import NextAuthProvider from "../layout"

export default function Museo() {
    const params = useParams()
    toast.success(params.slug)

    useEffect(() => {
        getMessages()
    }, [])

    const getMessages = async () => {
        try{
        await axios.post('http://localhost:3000/api/comments/get', {
            parametros: params.slug.toString()
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
          })
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
        <NextAuthProvider>
          <div className='w-full h-screen flex flex-col bg-dashBack'>
        <h1>Holaaa!</h1>
          </div>
        </NextAuthProvider>
      </>
    )
}