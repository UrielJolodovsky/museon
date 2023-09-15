"use client"
import { SessionProvider } from "next-auth/react";
import ToasterContext from "@/context/ToasterContext";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Session } from "next-auth";
import { metadata } from "../metadata";
import { StateProvider } from "@/context/StateContext";
import NavLanding from "./Inicio/components/start/NavLanding";

const inter = Poppins({
  subsets: ["latin-ext"],
  weight: "400",
});

type Props = {
  children?: React.ReactNode;
};

export default function NextAuthProvider({ children }: Props) {
  console.log('NextAuthProvider se está ejecutando'); //Confirmo que ande

  return (
    <SessionProvider>
      <StateProvider>
        <html lang="en">
          <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body className={inter.className}>
            <ToasterContext />
            <header className='w-full overflow-hidden flex justify-center absolute header-layout '>
              <NavLanding />
            </header>
            {children}
          </body>
        </html>
      </StateProvider>
    </SessionProvider>
  );;
};
