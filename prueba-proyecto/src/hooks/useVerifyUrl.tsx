import dir_url from "@/lib/url"
import axios from "axios"
import { useParams } from "next/navigation"


const useVerifyUrl = async() => {
    
    const params = useParams()
    const MuseoName = params.slug.toString().replace('-', ' ')

    const verifyurl = await axios.post(`${dir_url}/verifyMuseoName`, {
        name_museo: MuseoName
    })
    return verifyurl.data as boolean
}

export default useVerifyUrl