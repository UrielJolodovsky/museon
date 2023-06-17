'use client';

import InputVariants from '@/components/InputVariants'
import { useState } from 'react'

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
            <button className='w-40 h-12 rounded-md bg-btnForm hover:bg-opacity-80 transition font-bold'>
              {variant === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
            <p className='text-white flex flex-row gap-2'>
              {variant === 'login' ? 'No te registraste todavía??' : 'Ya tenes una cuenta?'}
              <span className='text-white font-bold hover:underline cursor-pointer' onClick={handleClick}>
                {variant === 'login' ? 'Registrarse' : 'Inicia Sesión'}
              </span>
            </p>
          </form>
        </div>
      </div>

    </>
  )
}