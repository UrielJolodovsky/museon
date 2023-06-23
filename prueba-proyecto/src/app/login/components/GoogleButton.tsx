"use client"

import { signIn } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'

const GoogleButton = () => {

    
async function LogInGoogle() {
  try {
    await signIn("google", { callbackUrl: '/dashboard' }).then((res) => {
      console.log(res)
    }).catch((err) => toast.error(err))
  } catch (error) {
    console.log(error)
  }
}   
  return (


   <button onClick={LogInGoogle} className='font-bold w-64 h-12 bg-white rounded-xl text-lg flex flex-row justify-center items-center gap-2'>
       <FcGoogle/> Continuar con Google     
   </button> 
    )
}

export default GoogleButton