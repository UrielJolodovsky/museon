'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import jwt from 'jsonwebtoken'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import dir_url from '@/lib/url'

const Token = () => {
    
    const params = useParams()
    const token = params.slug.toString()

    const verifytoken = async() => {
      await axios.post(`${dir_url}/api/verification_email`, {
        token: token
      }).then((res) => {
        toast.success(res.data)
      }).catch((err) => {
        toast.error(err.response.data)
      })
    }
    
  return (
    <div>Token</div>
  )
}

export default Token