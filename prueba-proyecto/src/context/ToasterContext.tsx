'use client'

import toast, { Toaster } from "react-hot-toast"

const ToasterContext = () => {
    return (
        <Toaster />
    )
}

export default ToasterContext

const toastError = (message: string) => {
    if (message.length > 0 && message !== "" && message !== undefined) {
    toast(`${message}`, {
        icon: "❌",
        style: {
          background: 'white',
          color: 'black',
          fontWeight: '600',
          padding: '10px'
        },
        duration: 2000,
        position: 'bottom-right',
      });
    }
}

const toastSuccess = (message: string) => {
    if (message.length > 0 && message !== "" && message !== undefined) {
    toast(`${message}`, {
        icon: "✔️",
        style: {
          background: 'white',
          color: 'black',
          fontWeight: '600',
          padding: '10px'
        },
        duration: 2000,
        position: 'bottom-right',
      });
    }
}

const toastComentarioError = () => {
    toast('Ha ocurrido un error', {
        icon: "❌",
        style: {
            background: 'white', // Cambia el color de fondo
            color: 'black',
            fontWeight: '600',
            padding: '10px'// Cambia el color del texto
        },
        duration: 2000, // Establece la duración en milisegundos
        position: 'bottom-right', // Cambia la posición de la notificación
        // Puedes agregar más opciones según tus necesidades
    });
}

export { toastError, toastSuccess, toastComentarioError }