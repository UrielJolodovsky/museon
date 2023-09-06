import { createContext, useContext, useState } from 'react';

type EventContextType = {
    eventoEnviado: boolean
    setEventoEnviado: (selectedMenu: boolean) => void
}

export const EventContext = createContext<EventContextType>({
    eventoEnviado: false,
    setEventoEnviado: () => { },
  });

  export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const [eventoEnviado, setEventoEnviado] = useState(false)
    return (
      <EventContext.Provider value={{ eventoEnviado, setEventoEnviado }}>
        {children}
      </EventContext.Provider>
    );
  }