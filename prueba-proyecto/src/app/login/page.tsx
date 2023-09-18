'use client';

import InputVariants from '@/app/login/components/InputVariants'
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
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
  const [variant, setVariant] = useState('login')
  const { data: sessionData } = useSession()

  const handleClick = () => {
    setEmail('')
    setPassword('')
    setName('')
    if (variant === 'register') {
      setVariant('login')
    }
    else if (variant === 'login') {
      setVariant('register')
    }
  }

  const toastRegister = () => {
    toast('Usuario creado correctamente, verifícate en tu mail!', {
      icon: "✔️",
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

  const toastLogin = () => {
    toast('Bienvenido a MuseOn!', {
      icon: "✔️",
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

  const toastIncorrect = () => {
    toast('Usuario o contraseña incorrectos', {
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
            toastIncorrect()
            if (callback.error === 'Wrong password') {
              setPassword('')
            }
          }
          if (callback?.ok && !callback?.error) {
            setLoggeado(true)
            router.push('/')
            toastLogin()
            setName('')
            setPassword('')
            setEmail('')
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
          toastRegister()
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
      {sessionData?.user.name ?
        (router.push(`${dir_url}`))
        :
        (<div className='w-full h-screen bg-dashBack flex flex-row md:flex-col gap-8 overflow-hidden justify-center items-center login-container'>
          <div className="w-1/3 rounded-lg self-center py-10 bg-black shadow-2xl flex flex-col gap-4 login-div">
            <h2 className="text-white h-1/5 text-4xl font-bold flex justify-start px-12">
              {variant === 'login' ? 'Inicia Sesión' : 'Registro'}
            </h2>
            <div className='w-full border-b-[1px] border-white flex flex-row'>
              <p className='w-full text-white text-sm flex flex-row lg:flex-col gap-2 pl-12 pb-2'>
                {variant === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}
                <span className='text-blue font-normal hover:underline cursor-pointer text-start' onClick={handleClick}>
                  {variant === 'login' ? 'Registrarse' : 'Inicia Sesión'}
                </span>
              </p>
            </div>
            <form className="w-full h-2/3 flex flex-col gap-4 justify-start items-start px-12">
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
              <button type='submit' onClick={LogInCredentials} className='w-full h-12 rounded-md bg-white hover:bg-opacity-80 transition font-bold text-black'>
                {variant === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </form>
            <div className='flex flex-col gap-4 justify-between items-center w-full'>
              <GoogleButton />
            </div>
          </div>
          <div className='w-1/3 h-screen flex justify-center items-center login-video-div'>
            <div className='h-[246px] w-[610px] border-2 rounded-2xl'>
              <video
                className='h-full w-full rounded-xl border-0'
                src="https://res.cloudinary.com/dxt2lvdt3/video/upload/v1691413761/videolanding.mp4"
                autoPlay // Esto inicia la reproducción automáticamente
                muted   // Esto desactiva el sonido del video
                loop />
            </div>
          </div>
        </div >
        )}
    </>
  )
}