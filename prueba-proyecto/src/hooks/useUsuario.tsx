'use client'
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";



const useUsuario = async () => {
    const {data: sessionData} = useSession()
    const nombre = sessionData?.user ? sessionData.user.email : ''
    const tipoUsuario = await axios.post('http://localhost:3000/api/tipo_usuario', {
        nombre: nombre
    })
 return tipoUsuario
}