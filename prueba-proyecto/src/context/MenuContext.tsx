import { useCycle } from 'framer-motion';
import { createContext, useContext, useState } from 'react';

type MenuContextType = {
  mobileNav: boolean
  toggleMobileNav: () => void
}

export const MenuContext = createContext<MenuContextType>({
  mobileNav: false,
  toggleMobileNav: () => { },
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [mobileNav, toggleMobileNav] = useCycle(false)

  return (
    <MenuContext.Provider value={{ mobileNav, toggleMobileNav }}>
      {children}
    </MenuContext.Provider>
  );
}