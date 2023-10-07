
import React from 'react'
import { motion, useCycle, AnimatePresence } from 'framer-motion'
import MenuItems from '../MenuItems'


const NavMenu = () => {


  const [mobileNav, toggleMobileNav] = useCycle(false, true)








  return (
    <nav className='md:hidden w-4/5 h-[80px] sticky  flex justify-start items-center bg-navColor z-10'>
      <div className='px-4  flex items-center h-full w-full'>
        <div className={`container z-10 ${mobileNav ? 'open' : 'closed'} ${mobileNav ? 'fixed' : 'flex'}`}>
          <motion.button
            animate={mobileNav ? 'open' : 'closed'}
            onClick={() => toggleMobileNav()}
            className='flex flex-col space-y-1'>
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 46, y: 6 }
              }}
              className='w-6 h-[2px] bg-white block'></motion.span>
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              className='w-6 h-[2px] bg-white block'></motion.span>
            <motion.span
              variants={{
                closed: { rotate: 0 },
                open: { rotate: -46, y: -6 }
              }}
              className='w-6 h-[2px] bg-white block'></motion.span>
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {mobileNav && (
          <motion.div
            variants={{
              open: {
                x: '0%'


              },
              closed: {
                x: '-100%',


              }
            }}
            exit="closed"
            initial="closed"
            animate="open"
            className='fixed bg-navColor -inset-x-32 inset-y-0 md:hidden flex flex-col items-center justify-center w-full h-screen'>
            <MenuItems />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}


export default NavMenu


