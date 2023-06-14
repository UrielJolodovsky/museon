'use client';

import InputVariants from '@/components/InputVariants'
import { useState } from 'react'

export default function Login() {
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const [variant, setVariant] = useState('register')

  return (
    <>
      <div className="w-full h-screen bg-indigo-200 flex justify-center items-center">
          <div className="w-96 h-96 rounded-lg lg:2/5 lg:w-max-md self-center px-12 py-12 bg-violet-950 flex flex-col">
            <h2 className="text-white h-1/5 text-4xl font-bold flex justify-center">Hola</h2>
          <div className="w-full h-4/5 flex flex-col gap-4 justify-start items-center">
            <InputVariants 
              label='Username'
              onChange={(e : any) => setName(e.target.value)}
              id='name'
              type='text'
              value={name}
            />
            { variant === 'register' &&(
            <InputVariants 
              label='Email'
              onChange={(e : any) => setEmail(e.target.value)}
              id='email'
              type='text'
              value={email}
            />
            )
          }
            <InputVariants 
              label='Password'
              onChange={(e : any) => setPassword(e.target.value)}
              id='password'
              type='password'
              value={password}
            />

          </div>
        </div>
      </div>

    </>
  )
}