"use client";
import { StateProvider } from "@/context/StateContext";
import FirstLanding from "@/app/inicio/page";
import Loader from "@/load/Loader";
import { statusAuth } from "@/load/status";
import { useSession } from "next-auth/react";
import React, { useState } from "react";


export default function Home({ }) {
  const { status } = useSession()
  const { LOADING } = statusAuth

  return (
    <>
      {status === LOADING ? (<Loader />) : (<FirstLanding />)}
    </>
  )
}
