import { toastComentarioError, toastError } from "@/context/ToasterContext"
import dir_url from "@/lib/url"
import { EventsProps } from "@/types"
import axios from "axios"
import { SetStateAction, useState } from "react"


const useGetEvents = async() => {

        const eventos = await axios.get(`${dir_url}/api/eventos/get`).catch((err) => {
            toastError(err)
        })

        const info = eventos.data as EventsProps[]

    
    return info
}

export default useGetEvents
