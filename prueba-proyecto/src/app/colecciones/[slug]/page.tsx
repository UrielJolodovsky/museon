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
        getLikes()
        // useUrl().then((res) => setIsUrl(res))
        // useLikes().then((res) => setLikes(res))
    }, [messageEnviado])


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
            const isAlreadyLiked = liked.find((like) => like.commentId === id_comment && like.btnLike);

            if (isAlreadyLiked) {
                updatedLikes = liked.filter((like) => like.commentId !== id_comment);
            } else {
                updatedLikes = [...liked, { commentId: id_comment, btnLike: true }];
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
                                            <button id={index.toString()}
                                                className={cn('bg-dashHover w-1/12 h-12 rounded-lg font-bold', {
                                                    'bg-red': liked.find((like) => like.commentId === museo['id'] && like.btnLike === true)
                                                })} onClick={(event: MouseEvent<HTMLButtonElement>) => { AddDeleteLike(event, museo['id']) }}>Like</button>
                                        </div>
                                    )) : (
                                    messages.map((museo, index) =>
                                        <div className=' w-full h-auto flex justify-center items-start flex-col gap-2 p-10 rounded-lg' key={index}>
                                            <h2 className='text-center font-bold text-black'>@{museo["author"]["name"]}</h2>
                                            <h1 className='text-center text-black'>{museo["content"]}</h1>
                                            <button id={index.toString()}
                                                className={cn('bg-dashHover w-1/12 h-12 rounded-lg font-bold')} onClick={(event: MouseEvent<HTMLButtonElement>) => { AddDeleteLike(event, museo['id']) }}>Like</button>
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