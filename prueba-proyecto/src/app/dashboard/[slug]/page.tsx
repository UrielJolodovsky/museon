'use client'
import axios from "axios"
import { useParams } from "next/navigation"
import { toast } from "react-hot-toast"


export default function Museo() {
    const params = useParams()
    toast.success(params.slug)


    const getMessages = async () => {
        await axios.get('http://localhost:3000/api/comments/get', {
            params: params.slug
        })
    }

    return (
        <div>
            <h1>Museo</h1>
        </div>
    )
}