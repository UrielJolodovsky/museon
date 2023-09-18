import { createContext, useContext, useState } from 'react';

type EventContextType = {
  eventoEnviado: boolean
  setEventoEnviado: (selectedMenu: boolean) => void
  fecha: string;
  setFecha: (fecha: string) => void;
}

export const EventContext = createContext<EventContextType>({
  eventoEnviado: false,
  setEventoEnviado: () => { },
  fecha: '',
  setFecha: () => { },
});

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [eventoEnviado, setEventoEnviado] = useState(false)
  const [fecha, setFecha] = useState('');

  return (
    <EventContext.Provider value={{ eventoEnviado, setEventoEnviado, fecha, setFecha }}>
      {children}
    </EventContext.Provider>
  );
}