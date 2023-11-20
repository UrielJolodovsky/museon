'use client'
import axios from 'axios'
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState, MouseEvent } from "react"
import { toast } from "react-hot-toast"
import { CommentsProps, LikesProps, MuseosProps } from '@/types'
import dir_url from '@/lib/url'
import Comp3d from '@/3dComps/Comp3d'
import internet from '@../../public/assets/icons/internet.png'
import instagram from '@/../../public/assets/FooterIcon/insta.png'
import twitter from '@/../../public/assets/FooterIcon/twitter.png'
import face from '@/../../public/assets/FooterIcon/face.png'
import Image from 'next/image'
import Scene from '@/three-js/Scene'
import { toastSuccess, toastError, toastComentarioError } from '@/context/ToasterContext'
import useMessages from '@/hooks/useMessages'
import useUrl from '@/hooks/useUrl'
import useLikes from '@/hooks/useLikes'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'



export default function Museo() {

    const [message, setMessage] = useState('')
    const [museos, setMuseos] = useState<MuseosProps[]>([])
    const [messages, setMessages] = useState<CommentsProps[]>([])
    const [liked, setLiked] = useState<LikesProps[]>([])

    const params = useParams()
    const MuseoName = params.slug.toString().replace('-', ' ')
    const [isUrl, setIsUrl] = useState<Boolean>(false)
    const [messageEnviado, setMessageEnviado] = useState(false)

    const { data: sessionData } = useSession()

    useEffect(() => {
        // useMessages().then((res) => setMessages(res))
        getMessages()
        setMessageEnviado(false)
        verifyUrl()
        // useUrl().then((res) => setIsUrl(res))
        // useLikes().then((res) => setLikes(res))
    }, [messageEnviado])

    useEffect(() => {
        getLikes()
    }, [])

    const verifyUrl = async () => {
        try {
            await axios.post(`${dir_url}/api/verifyMuseoName`, {
                name_museo: MuseoName
            }).then((res) => {
                setIsUrl(res.data)
            }).catch((err) => {
                toastError(err.response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const addMessage = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            await axios.post(`${dir_url}/api/comments/add`, {
                message: message,
                nameMuseo: params.slug.toString()
            }).then((res) => {
                setMessage('')
                toastSuccess(res.data)
                setMessageEnviado(true)
                setMessages(res.data)
            }).catch((err) => {
                toastError(err.response.data)
            })
        } catch (err) {
            toastComentarioError()
        }
    }
    const AddDeleteLike = async (event: MouseEvent<HTMLButtonElement>, id_comment: string) => {
        event.preventDefault()
        try {
            let updatedLikes;
            const isAlreadyLiked = liked.find((like) => like.commentId === id_comment);
            if (isAlreadyLiked) {
                updatedLikes = liked.filter((like) => like.commentId !== id_comment);
            } else {
                updatedLikes = [...liked, { commentId: id_comment }];
            }
            setLiked(updatedLikes);
            await axios.post(`${dir_url}/api/likes/add`, {
                id_comment: id_comment,
                userId: sessionData?.user.id,
            });
            toastSuccess(isAlreadyLiked ? "Se eliminó con éxito" : "Se agregó con éxito");
        } catch (err) {
            toastComentarioError()
        }
        console.log(liked)

    }

    const getLikes = async () => {
        try {
            await axios.get(`${dir_url}/api/likes/get`).then((res) => {
                setLiked(res.data)
            }).catch((err) => {
                console.log(err.response.data)
                toastError(err.response.data)
            })
        } catch (err) {
            toastComentarioError()
        }
    }

    const getMessages = async () => {
        try {
            await axios.post(`${dir_url}/api/comments/get`, {
                parametros: params.slug.toString()
            }).then((res) => {
                setMessages(res.data)
            }).catch((err) => {
                toastError(err.response.data)
            })
        } catch (err) {
            toastComentarioError()
        }
    }

    return (
        <>
            {isUrl === true ? (
                <section className='w-full h-[1200px] flex flex-col gap-20'>
                    <div className='w-full h-4/6 flex flex-col gap-6 pt-10'>
                        <div className='h-4/6 flex justify-center items-center pb-20'>
                            <h1 className=' text-4xl font-bold text-center'>Museos</h1>
                        </div>
                        <div className='w-full h-[500px] flex justify-center items-center'>
                            <Scene />
                        </div>
                    </div>
                    <div className='flex justify-center items-center flex-col '>
                        <div className='w-full h-1/12 flex justify-center items-center'>
                            <h1 className='text-black font-medium '>{messages.length} Comentarios</h1>
                        </div>
                        <div className=' w-[1000px] h-11/12 flex justify-center items-center gap-10 flex-col'>
                            <form className='flex w-full flex-row gap-5'>
                                <input value={message} className="w-11/12 border-b-2 focus:border-0 p-4" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                                <button type='submit' className="bg-dashHover w-1/12 h-12 rounded-lg font-bold" onClick={addMessage}>Add</button>
                            </form>
                            <div className='w-full  flex justify-center items-start flex-col gap-4 '>
                                {sessionData?.user ? (
                                    messages.map((museo, index) =>
                                        <div className=' w-full h-auto flex justify-center items-start flex-col gap-2 p-10 rounded-lg' key={index}>
                                            <h2 className='text-center font-bold text-black'>@{museo["author"]["name"]}</h2>
                                            <h1 className='text-center text-black'>{museo["content"]}</h1>
                                            <div className='flex w-full h-10 justify-start items-center flex-row gap-5'>
                                                <button
                                                    id={index.toString()}
                                                    onClick={(event: MouseEvent<HTMLButtonElement>) => { AddDeleteLike(event, museo['id']) }}
                                                    className={cn({
                                                        'fill-red': liked.find((like) => like.commentId === museo['id'])
                                                    })}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="contentColor" stroke='black' className="w-6 h-6 stroke-2">
                                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                    </svg>
                                                </button>
                                                <button className=''>
                                                    <span className='font-bold'>Responder</span>
                                                </button>
                                            </div>

                                        </div>
                                    )) : (
                                    messages.map((museo, index) =>
                                        <div className=' w-full h-auto flex justify-center items-start flex-col gap-2 p-10 rounded-lg' key={index}>
                                            <h2 className='text-center font-bold text-black'>@{museo["author"]["name"]}</h2>
                                            <h1 className='text-center text-black'>{museo["content"]}</h1>
                                            <button id={index.toString()}
                                                className={cn('love')} onClick={(event: MouseEvent<HTMLButtonElement>) => { AddDeleteLike(event, museo['id']) }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"

                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            ) : ''}

        </>
    )
}