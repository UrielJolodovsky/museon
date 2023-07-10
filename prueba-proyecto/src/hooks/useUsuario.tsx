'use client'
import axios from "axios";
import { useSession } from "next-auth/react";



const useUsuario = async () => {
    const {data: sessionData} = useSession()
    const nombre = sessionData?.user ? sessionData.user.email : ''
    if (nombre === '') {
        return nombre
    }
    const tipoUsuario = await axios.post('http://localhost:3000/api/tipo_usuario', {
        nombre: nombre
    })
 return tipoUsuario
}

export default useUsuario