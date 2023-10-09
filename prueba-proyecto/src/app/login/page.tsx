'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import dir_url from '@/lib/url';
import '@/app/globals.css'
import VideoPlay from './components/VideoPlay';
import Form from './components/Form';

export default function Login() {
  const { data: sessionData } = useSession()

  const router = useRouter()


  return (
    <>
      {sessionData?.user.name ?
        (router.push(`${dir_url}`))
        :
        (<div className='w-full p-5 h-full bg-dashBack flex flex-col lg:flex-row justify-center items-center gap-5'>
          <Form />
          <VideoPlay />
        </div>
        )}
    </>
  )
}