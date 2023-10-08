import dir_url from "@/lib/url"
import axios from "axios"
import { useSession } from "next-auth/react"


const useLikes = async() => {

    const {data: sessionData} = useSession()
    
    if (sessionData?.user) {
        const likes = await axios.get(`${dir_url}/api/likes/get`)
        const data = likes.data
        return data
    }
    return []
}

export default useLikes