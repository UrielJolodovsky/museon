"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export default function NextAuthProvider({ children }: Props) {
  console.log('NextAuthProvider se está ejecutando'); //Confirmo que ande

  return <SessionProvider>{children}</SessionProvider>;
};