import { toastComentarioError, toastError } from "@/context/ToasterContext"
import dir_url from "@/lib/url"
import { EventsProps } from "@/types"
import axios from "axios"
import { SetStateAction, useState } from "react"


const useGetEvents = async() => {
    
    const [info, setInfo] = useState<EventsProps[]>([])
    try{

        const eventos = await axios.get(`${dir_url}/api/eventos/get`)
        .then((res) => setInfo(res.data))
        .catch((err) => toastError(err.response.data))

    } catch(err) {
        toastComentarioError()
    }
    
    return info
}

export default useGetEvents
