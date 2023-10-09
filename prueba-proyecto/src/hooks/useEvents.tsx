import { toastError } from "@/context/ToasterContext"
import dir_url from "@/lib/url"
import { EventsProps } from "@/types"
import axios from "axios"


const useEvents = async() => {
    let info: EventsProps[] = []
        const eventos = await axios.get(`${dir_url}/api/eventos/get`).then((res) => info = res.data).catch((err) => {
            toastError(err)
        })
    return info
}

export default useEvents