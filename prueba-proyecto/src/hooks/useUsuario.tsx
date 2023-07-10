'use client'
import dir_url from "@/lib/url";
import axios from "axios";
import { useSession } from "next-auth/react";



const useUsuario = async () => {
    const {data: sessionData} = useSession()
    const username_email = sessionData?.user ? sessionData.user.email : ''
    if (username_email === '') {
        return username_email
    }
    const tipoUsuario = await axios.post(`${dir_url}/api/tipo_usuario`, {
        username_email: username_email
    })
 return tipoUsuario
}

export default useUsuario