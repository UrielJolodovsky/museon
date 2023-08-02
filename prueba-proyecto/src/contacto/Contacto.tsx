import React from 'react'

const contacto = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='flex w-2/3 h-2/3 justify-start items-center flex-col gap-10 '>
      <h1 className='text-3xl font-bold'>Comunicate con nuestro equipo</h1>
      <form action="" className='w-1/2 h-full flex justify-center items-center  bg-black p-10'>
        <textarea autoComplete='off' name='message' id='message' placeholder='Mensaje' className='w-2/3 h-2/3 p-3 bg-transparent text-white border-white border-2 text-left pt-3 resize-none'></textarea>
      </form>
      </div>
    </div>
  )
}

export default contacto