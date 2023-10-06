import dir_url from "@/lib/url"
import axios from "axios"
import { useParams } from "next/navigation"


const useGetMessages = async() => {
    
    const params = useParams()
    const messages = await axios.post(`${dir_url}/api/comments/get`, {
        parametros: params.slug.toString()
    })
    const data = messages.data

    return data
}

export default useGetMessages