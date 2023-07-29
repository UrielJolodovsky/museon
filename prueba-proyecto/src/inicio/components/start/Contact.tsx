import React from 'react'
import UserIcon from '../../../../public/assets/FooterIcon/UserIcon.png'
import UploadIcon from '../../../../public/assets/FooterIcon/UploadIcon.png'
import CodeIcon from '../../../../public/assets/FooterIcon/CodeIcon.png'
import Image from 'next/image'
const Contact = () => {

  const dataContact = [
    {
      id: 1,
      icon: UserIcon,
      content: 'Contacto con museo para realizar un escaneo 3D'
    },
    {
      id: 2,
      icon: UploadIcon,
      content: 'Subida de escaneo de museo a la página'
    },
    {
      id: 3,
      icon: CodeIcon,
      content: 'Programación de escena 3D dentro de la página'
    },
  ]

  return (

    <div className='w-full h-80 flex justify-center items-center'>

      {dataContact.map(({ id, icon, content }) => {
        return (
          <div key={id} className='w-1/3 h-20 flex justify-center items-center flex-col gap-16'>
            <div className='flex items-center justify-center h-1/3 flex-col gap-4'>
              <h1 className='text-xl font-light text-center border-x border-y rounded-full p-3 w-8 h-8 flex justify-center items-center'> {id}</h1>
              <Image
                src={icon}
                alt='icon'
                className='w-[50px] h-[50px] rounded-full'
              ></Image>
            </div>
            <div className='w-2/3 h-2/3 flex justify-start items-start'>
              <p className='text-justify '>{content}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Contact