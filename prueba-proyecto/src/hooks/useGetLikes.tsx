'use client'
import dir_url from "@/lib/url"
import axios from "axios"
import { useSession } from "next-auth/react"



const useGetLikes = async() => {
    const {data: sessionData} = useSession()
    
    const likes = await axios.get(`${dir_url}/api/likes/get`)
    const data = likes.data

    return data
}

export default useGetLikes