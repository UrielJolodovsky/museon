'use client';

import InputVariants from '@/app/login/components/InputVariants'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import GoogleButton from './components/GoogleButton';
import toast from 'react-hot-toast';
import dir_url from '@/lib/url';
import '@/app/globals.css'

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
          email: email,
          password: password,
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            toast.error(callback.error)
            if (callback.error === 'Wrong password') {
              setPassword('')
            }
          }
          if (callback?.ok && !callback?.error) {
            setLoggeado(true)
            toast.success('Bienvenido!')
            router.push('/')
            setEmail('')
            setPassword('')
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
          setEmail('')
          setPassword('')
          setName('')
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
      <div className='w-full h-screen bg-dashBack flex flex-row md:flex-col gap-8 overflow-hidden justify-center items-center login-container'>
        <div className="w-1/3 rounded-lg self-center py-10 bg-black shadow-2xl flex flex-col gap-4 login-div">
          <h2 className="text-white h-1/5 text-4xl font-bold flex justify-start px-12">
            {variant === 'login' ? 'Inicia Sesión' : 'Registro'}
          </h2>
          <div className='w-full border-b-2 flex flex-row'>
            <p className='w-full text-white text-sm flex flex-row lg:flex-col gap-2 pl-12'>
              {variant === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}
              <span className='text-blue font-normal hover:underline cursor-pointer text-start' onClick={handleClick}>
                {variant === 'login' ? 'Registrarse' : 'Inicia Sesión'}
              </span>
            </p>
          </div>
          <form className="w-full h-2/3 flex flex-col gap-4 justify-start items-start px-12">
            {variant === 'register' && (

              <InputVariants
                label='Email'
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                id='email'
                type='text'
                value={email}
              />
            )}

            <InputVariants
              label='Username'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              id='name'
              type='text'
              value={name}
            />

            <InputVariants
              label='Password'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              id='password'
              type='password'
              value={password}
            />
            <button type='submit' onClick={LogInCredentials} className='w-full h-12 rounded-md bg-white hover:bg-opacity-80 transition font-bold text-black'>
              {variant === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>
          <div className='flex flex-col gap-4 justify-between items-center w-full'>
            <GoogleButton />
          </div>
        </div>
        <div className='w-1/3 h-screen flex justify-center items-center login-video-div'>
          <div className='h-[250px] w-[624px] login-video border-2 rounded-xl'></div>
        </div>
      </div>
    </>
  )
}