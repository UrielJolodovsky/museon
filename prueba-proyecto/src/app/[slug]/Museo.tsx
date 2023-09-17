'use client';
import axios from 'axios';
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { toast } from "react-hot-toast";
import { CommentsProps, MuseosProps } from '@/types';
import dir_url from '@/lib/url';
import internet from '@../../public/assets/icons/internet.png';
import instagram from '@/../../public/assets/FooterIcon/insta.png';
import twitter from '@/../../public/assets/FooterIcon/twitter.png';
import face from '@/../../public/assets/FooterIcon/face.png';
import Image from 'next/image';
import Scene from '@/three-js/Scene';



export default function Museo() {

  const [message, setMessage] = useState('');
  const [museos, setMuseos] = useState<MuseosProps[]>([]);
  const [messages, setMessages] = useState<CommentsProps[]>([]);
  const params = useParams();
  const MuseoName = params.slug.toString().replace('-', ' ');
  const [isUrl, setIsUrl] = useState<Boolean>(false);

  const [messageEnviado, setMessageEnviado] = useState(false);

  useEffect(() => {
    getMessages();
    setMessageEnviado(false);
    verifyUrl();
  }, [messageEnviado]);


  const verifyUrl = async () => {
    try {
      await axios.post(`${dir_url}/api/verifyMuseoName`, {
        name_museo: MuseoName
      }).then((res) => {
        setIsUrl(res.data);
        console.log(res.data);
      }).catch((err) => {
        toast.error(err.response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addMessage = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${dir_url}/api/comments/add`, {
        message: message,
        nameMuseo: params.slug.toString()
      }).then((res) => {
        setMessage('');
        toast.success(res.data);
        setMessageEnviado(true);
        setMessages(res.data);
      }).catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getMessages = async () => {
    try {
      await axios.post(`${dir_url}/api/comments/get`, {
        parametros: params.slug.toString()
      }).then((res) => {
        setMessages(res.data);
        console.log(res.data);
      }).catch((err) => {
        toast.error(err.response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const CompIcon = [
    {
      id: 1,
      icon: internet,
    },
    {
      id: 2,
      icon: instagram,
    },
    {
      id: 3,
      icon: twitter,
    },
    {
      id: 4,
      icon: face,
    }
  ];

  return (
    <>
      {isUrl === true ? (
        <section className="w-full h-screen flex justify-center items-center flex-col">
          <div className='w-full h-full flex justify-center items-center flex-col gap-5'>
            <div className='w-full h-1/5 flex justify-center items-center flex-col'>
              <h1 className='text-4xl font-bold text-center'>Museos</h1>
              <div className='w-full h-1/5 flex justify-center items-center'>
                {CompIcon.map(({ id, icon }) => {
                  return (
                    <Image
                      key={id}
                      src={icon}
                      alt='icon'
                      className='w-[30px] h-[30px]'
                    >
                    </Image>
                  );
                })}
              </div>
            </div>
            <div className='w-[800px] h-4/5 flex justify-center items-center flex-col gap-10'>
              <div className='w-full h-[500px] flex justify-center items-center'>
                <Scene />
              </div>
              <div className='w-full h-1/3 flex justify-center items-start flex-col'>
                <h1>{messages.length} Comentarios</h1>
                <div className='w-full h-full flex flex-col gap-5'>
                  <form className='flex flex-row gap-2'>
                    <input value={message} className="w-full border-b-2 focus:border-none" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                    <button type='submit' className="bg-dashBack w-28 h-8 rounded-lg font-bold" onClick={addMessage}>Add</button>
                  </form>
                  <div className='w-full h-full flex flex-col gap-4 '>
                    {Array.isArray(messages) ? messages.map((museo, index) => <div className='bg-dashBack w-full h-auto flex justify-start items-center flex-row gap-10 p-10' key={index}>
                      <h2 className='text-center font-bold text-black'>Name: {museo["author"]["name"]}</h2>
                      <div className=''>
                        <h1 className='text-center text-black'>Contenido del mensaje: {museo["content"]}</h1>
                      </div>
                    </div>
                    ) : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>) : ''}

    </>
  );
}
