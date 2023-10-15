import { ChangeEvent, MouseEvent, useState } from "react";
import InputVariants from "./InputVariants";
import React from 'react'
import axios from "axios";
import dir_url from "@/lib/url";
import { toastError, toastSuccess } from "@/context/ToasterContext";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleButton from "./GoogleButton";

const Form = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Loggeado, setLoggeado] = useState(false)
  const [variant, setVariant] = useState('login')

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
            toastError(callback.error)
            if (callback.error === 'Wrong password') {
              setPassword('')
            }
          }
          if (callback?.ok && !callback?.error) {
            setLoggeado(true)
            router.push('/')
            toastSuccess('Bienvenido a MuseON!')
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
          toastSuccess('Usuario creado correctamente, verifícate en tu mail!')
          setEmail('')
          setPassword('')
          setName('')
          setVariant('login')
        }).catch((err) => {
          toast.error(err.response.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (

    <div className="w-full log:w-4/5 md:w-2/3 lg:w-1/3 h-auto rounded-lg self-center py-10 bg-black shadow-2xl flex flex-col gap-4 order-2 lg:order-1">
      <h2 className="text-white h-1/5 text-4xl font-bold flex justify-center md:justify-start md:px-12 px-6">
        {variant === 'login' ? 'Inicia Sesión' : 'Registro'}
      </h2>
      <div className='w-full border-b-[1px] border-white flex flex-row'>
        <p className='w-full text-white text-sm flex justify-center flex-row lg:flex-col gap-2 md:pl-12 pb-2'>
          {variant === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}
          <span className='text-blue font-normal hover:underline cursor-pointer text-start' onClick={handleClick}>
            {variant === 'login' ? 'Registrarse' : 'Inicia Sesión'}
          </span>
        </p>
      </div>
      <form className="w-full h-full flex flex-col gap-4 justify-start items-start md:px-12 px-6">
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
  )
}

export default Form

