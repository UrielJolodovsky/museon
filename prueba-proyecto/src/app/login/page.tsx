'use client';

import InputVariants from '@/components/InputVariants'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import GoogleButton from './components/GoogleButton';
import toast from 'react-hot-toast';
import dir_url from '@/lib/url';

export default function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Loggeado, setLoggeado] = useState(false)
  const [variant, setVariant] = useState('register')

  const handleClick = () => {
    if (variant === 'login') {
      setVariant('register')
    } else {
      setVariant('login')
    }
  }

  const router = useRouter()

  async function LogInCredentials(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (variant === 'login') {
      try {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            toast.error(callback.error)
          }
          if (callback?.ok && !callback?.error) {
            toast.success('Bienvenido!')
            setLoggeado(true)
            router.push('/dashboard')
          }
        }).finally(() => {
          if (Loggeado) {
            // router.push('/dashboard')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    else if (variant === 'register') {
      try {
        await axios.post(`${dir_url}/api/register`, {
          email: email,
          name: name,
          password: password
        }).then((res) => {
          console.log(res.data)
          toast.success('Usuario creado con exito!')
        }).catch((err) => {
          toast.error(err.response.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className='w-full h-screen bg-dashBack flex flex-row gap-4 overflow-hidden'>
        <div className="w-1/2 h-screen flex justify-end items-center">
          <div className="xl:w-[610px] lg:w-[410px] md:w-[410px] sm:w-[310px] xl:h-[510px] lg:h-[510px] md:h-[550px] sm:h-[400px] rounded-lg lg:2/5 lg:w-max-md self-center px-12 py-12 bg-white shadow-2xl flex flex-col gap-4">
            <h2 className="text-black h-1/5 text-4xl font-bold flex justify-center">
              {variant === 'login' ? 'Inicia Sesión' : 'Registro'}
            </h2>
            <form className="w-full h-4/5 flex flex-col gap-4 justify-start items-center">
              {variant === 'register' && (
                <InputVariants
                  label='Username'
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  id='name'
                  type='text'
                  value={name}
                />
              )}

              <InputVariants
                label='Email'
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                id='email'
                type='text'
                value={email}
              />

              <InputVariants
                label='Password'
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                id='password'
                type='password'
                value={password}
              />
              <button type='submit' onClick={LogInCredentials} className='w-40 h-12 rounded-md bg-btnForm hover:bg-opacity-80 transition font-bold text-white'>
                {variant === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </form>
            <div className='flex flex-col gap-4 justify-between items-center w-full'>
              <p className='text-black flex flex-row gap-2'>
                {variant === 'login' ? 'No te registraste?' : 'Ya tienes una cuenta?'}
                <span className='text-black font-bold hover:underline cursor-pointer' onClick={handleClick}>
                  {variant === 'login' ? 'Registrarse' : 'Inicia Sesión'}
                </span>
              </p>
              <GoogleButton />
            </div>
          </div>
        </div>
        <div className='w-1/2 h-screen flex justify-center items-center'>
          <div className='xl:h-[510px] xl:w-[624px] lg:h-[510px] lg:w-[524px] md:w-[424px] md:h-[500px] sm:w-[300px] sm:h-[350px] border-2 rounded-xl'></div>
        </div>
      </div>
    </>
  )
}