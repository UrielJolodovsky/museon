import { motion, useCycle } from 'framer-motion';
import React, { useRef } from 'react'
import { MenuToggle } from './MenuToggle';
import MenuItems from './MenuItems';
import { useDimensions } from './useDimensions';
import { Navigation } from './Navigation';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const ExampleMenu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef: React.MutableRefObject<null> = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      variants={variants}
    >
      <motion.div className="bg-black" />
      <MenuToggle toggle={() => toggleOpen()} />
      <motion.div
        className='bg-black'
        variants={sidebar}
      >
        <Navigation />
      </motion.div>
    </motion.div>
  );
}



