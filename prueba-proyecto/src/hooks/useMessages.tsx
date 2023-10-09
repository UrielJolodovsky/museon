'use client'
import dir_url from "@/lib/url"
import { CommentsProps } from "@/types"
import axios from "axios"
import { useParams } from "next/navigation"


const useMessages = async() => {
    
    const params = useParams()
    const messages = await axios.post(`${dir_url}/api/comments/get`, {
        parametros: params.slug.toString()
    })
    const data = messages.data

    return data as CommentsProps[]
}

export default useMessages