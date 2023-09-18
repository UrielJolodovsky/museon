"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'

const GoogleButton = () => {
  async function LogInGoogle() {
    try {
      await signIn("google", { callbackUrl: '/inicio' }).then((res) => {
        console.log(res)
      }).catch((err) => toast.error(err))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button onClick={LogInGoogle} className='font-medium text-red w-[180px] h-[50px] rounded-xl text-lg flex flex-row justify-start items-center gap-5 border-red border-2 p-5'>
      <FcGoogle className='text-2xl' />Google
    </button>
  )
}

export default GoogleButton