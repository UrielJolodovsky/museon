"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export default function NextAuthProvider({ children }: Props) {
  console.log('NextAuthProvider se está ejecutando'); //Confirmo que nade la mierda esta}

  return <SessionProvider>{children}</SessionProvider>;
};