"use client";
import FirstLanding from "@/app/Inicio/page";
import Loader from "@/load/Loader";
import { statusAuth } from "@/load/status";
import { useSession } from "next-auth/react";
import React from "react";


export default function Home({ }) {
  const { status } = useSession()
  const { LOADING } = statusAuth

  return (
    <>
      {status === LOADING ? (<Loader />) : (<FirstLanding />)}
    </>
  )
}
