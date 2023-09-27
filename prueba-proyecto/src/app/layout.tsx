"use client"
import { SessionProvider } from "next-auth/react";
import ToasterContext from "@/context/ToasterContext";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Session } from "next-auth";
import { metadata } from "../metadata";
import NavLanding from "./inicio/components/start/NavLanding";

const inter = Poppins({
  subsets: ["latin-ext"],
  weight: "400",
});

type Props = {
  children?: React.ReactNode;
};

export default function NextAuthProvider({ children }: Props) {

  return (
    <SessionProvider>
<<<<<<< HEAD
      <StateProvider>
        <html lang="en">
          <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body className={inter.className}>
            <ToasterContext />
            <header className='w-full overflow-hidden flex justify-center relative header-layout '>
              <NavLanding />
            </header>
            {children}
          </body>
        </html>
      </StateProvider>
=======
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={inter.className}>
          <ToasterContext />
          <NavLanding />
          {children}
        </body>
      </html>
>>>>>>> 74c709726c883405401950c1f3afcfa5b27825f9
    </SessionProvider>
  );;
};
