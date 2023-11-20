import { motion } from 'framer-motion'
import React from 'react'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};



const ModalComentario: React.FC<ModalProps> = ({ isOpen, onClose }) => {

  if (!isOpen) return null;


  return (
    <motion.div className='w-full h-14 gap-5 flex justify-center items-center '>
      <input type="text" name="" id="" className='w-11/12 h-full border-b-2 focus:outline-none' />
      <button className='bg-black text-white font-semibold w-1/12 h-12 rounded-lg '>Enviar</button>
    </motion.div>
  )
}

export default ModalComentario