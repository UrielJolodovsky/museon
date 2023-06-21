'use client';

import InputVariants from '@/components/InputVariants'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('register')

  const handleClick = () => {
    if (variant === 'login') {
      setVariant('register')
    } else {
      setVariant('login')
    }
  }

  const router = useRouter()

  async function LogInCredentials(e: any) {
    e.preventDefault()
    if (variant === 'login') {
      try {
        await signIn("credentials", { 
          email,
          password,
          callbackUrl: '/dashboard' 
        }).then((res) => {
          console.log(res?.error)
        }).catch((err) => console.log(err))
      } catch (error) {
        console.log(error)
      }
    }
    else if (variant === 'register') {
      try {
        await axios.post('http://localhost:3000/api/login', {
          email: email,
          name: name,
          password: password
        }).then((res) => {
          console.log(res.data)
          router.push("/dashboard")
        }).catch((err) => {
          console.log(err)
        })
      } catch(error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className="w-full h-screen bg-dashBack flex justify-center items-start ">
        <div className="w-96 h-[28rem] rounded-lg lg:2/5 lg:w-max-md self-center px-12 py-12 bg-formBack flex flex-col gap-4">
          <h2 className="text-white h-1/5 text-4xl font-bold flex justify-center">
            {variant === 'login' ? 'Inicia Sesión' : 'Registro'}
          </h2>
          <form className="w-full h-4/5 flex flex-col gap-4 justify-start items-center">
            <InputVariants
              label='Username'
              onChange={(e: any) => setName(e.target.value)}
              id='name'
              type='text'
              value={name}
            />
            {variant === 'register' && (
              <InputVariants
                label='Email'
                onChange={(e: any) => setEmail(e.target.value)}
                id='email'
                type='text'
                value={email}
              />
            )
            }
            <InputVariants
              label='Password'
              onChange={(e: any) => setPassword(e.target.value)}
              id='password'
              type='password'
              value={password}
            />
            <button onClick={LogInCredentials} className='w-40 h-12 rounded-md bg-btnForm hover:bg-opacity-80 transition font-bold text-white'>
              {variant === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>
            <div className='flex flex-col gap-2 justify-between items-center w-full'>
            <p className='text-white flex flex-row gap-2'>
              {variant === 'login' ? 'No te registraste?' : 'Ya tenes una cuenta?'}
              <span className='text-white font-bold hover:underline cursor-pointer' onClick={handleClick}>
                {variant === 'login' ? 'Registrarse' : 'Inicia Sesión'}
              </span>
            </p>
          </div>
        </div>
      </div>

    </>
  )
}