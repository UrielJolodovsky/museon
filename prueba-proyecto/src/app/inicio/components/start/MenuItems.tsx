
import { signOut, useSession } from 'next-auth/react'
import { CldImage } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import LogOut from '../../../../../public/assets/icons/LogOut.png'
import { motion } from 'framer-motion';
import Image from 'next/image'
import { title } from 'process'
import { MenuContext } from '@/context/MenuContext'






const DataNav = [
  {
    id: 1,
    title: 'Inicio',
  },
  {
    id: 2,
    title: 'Colecciones',


  },
  {
    id: 3,
    title: 'Eventos',


  },
  {
    id: 4,
    title: 'Ayuda',
  },
]




const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};




const MenuItems = () => {
  const { data: sessionData } = useSession()
  const [active, setActive] = useState(false)
  const [activeHover, setActiveHover] = useState(false)
  const router = useRouter()


  const clickMenu = (title: string) => {
    if (title === 'Ayuda') {
      router.push(`/${title}`);
    } else {
      router.push(`/${title.toLowerCase()}`);
    }
  };


  const setValuesEvent = () => {
    setActive(!active);
    setActiveHover(false)


  }


  const handleLogin = () => {
    router.push('/login')


  }
  return (
    <ul className='pl-44 pt-20 md:p-0 w-full h-full md:flex-row flex-col items-start md:items-center justify-start space-y-5 md:space-y-0 md:justify-evenly flex  '>
      <div className='hidden md:flex'>
        <CldImage src={'Logo_Blanco'} width={50} height={50} alt='logo'></CldImage>
      </div>
      {DataNav.map(({ id, title }) =>
        <motion.li
          variants={variants}


          className=' list-none text-center flex flex-col justify-center items-center mt-1' key={id}
        >
          <button
            id='MyLink'
            className=' font-normal text-white link '
            onClick={() => clickMenu(title)}
          >
            {title}
          </button>
          <div className='line md:flex hidden'></div>
        </motion.li>
      )}
      {sessionData?.user ? (
        <div>
          <label
            className='cursor-pointer flex justify-center items-center flex-col'
            id='logOut-label'
            onMouseEnter={() => setActiveHover(true)}
            onMouseLeave={() => setActiveHover(false)}
            onClick={setValuesEvent}
          >


            <Image
              className='w-7 h-8'
              src={LogOut}
              alt='LogOut'
              height={400}
              width={400}></Image>
            {activeHover === true && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id='logOut-button'
                className='w-28 h-10 rounded-lg bg-gray absolute top-24 text-center flex items-center justify-center text-white font-medium'>
                {sessionData?.user?.name ? sessionData?.user?.name : sessionData?.user?.email}
              </motion.span>
            )}
          </label>
          {active === true && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              id='logOut-button'
              onClick={() => signOut()}
              className='w-36 h-10 rounded-lg cursor-pointer bg-gray absolute top-24 right-44 text-center flex items-center justify-center text-white font-medium'>
              Cerrar sesión
            </motion.span>
          )}
        </div>
      ) : (
        <motion.button
          onClick={handleLogin}
          className='md:w-40 md:h-12 text-[18px] md:font-bold flex justify-center items-center rounded-full md:text-black text-white md:bg-white  transition'
        >
          Iniciar sesión
        </motion.button>
      )
      }
    </ul>
  )
}


export default MenuItems
