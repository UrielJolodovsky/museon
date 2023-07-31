import { createContext, useContext, useState } from 'react';

type StateContextType = {
  selectedMenu: string;
  setSelectedMenu: (selectedMenu: string) => void;
}

export const StateContext = createContext<StateContextType>({
  selectedMenu: '',
  setSelectedMenu: () => { },
});


export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedMenu, setSelectedMenu] = useState('Inicio');

  return (
    <StateContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      {children}
    </StateContext.Provider>
  );
}