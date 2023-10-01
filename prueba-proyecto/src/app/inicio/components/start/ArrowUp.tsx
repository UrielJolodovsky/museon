import Link from 'next/link'
import React from 'react'
import arrow from '../../../../../public/assets/arrow.png'

import Image from 'next/image';
import { motion } from 'framer-motion';

const ArrowUp = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="contenedor-btn transition-all cursor-pointer hidden md:flex">
      <Link className="boton scroll-smooth" href="#header" >
        <Image src={arrow} alt='arrow' className='w-full h-full ' />
      </Link >
    </motion.div>
  )
}

export default ArrowUp