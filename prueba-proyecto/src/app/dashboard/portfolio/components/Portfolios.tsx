"use client"

import React, { useEffect, useState } from 'react'
import { PortfolioProps } from '@/types' 
import { toast } from 'react-hot-toast'
import dir_url from '@/lib/url'
import axios from 'axios'
import { CldImage } from 'next-cloudinary'

const Portfolios = () => {
    const [image, setImage] = useState<PortfolioProps[]>([])
    const [imageSended , setImageSended] = useState(false) 

    useEffect(() => {
        getImages()
        setImageSended(false)
    }, [imageSended])

    const getImages = async () => {
        try {
            await axios.get(`${dir_url}/api/portfolio/get`).then((res) => {
                setImage(res.data)
            }).catch((err) => {
                toast.error(err.response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }



  return (
    <div className='overflow-auto bg-formBack w-[38rem] h-56'>
          
          
          {Array.isArray(image) ? image.map((img, index) =>
            <div key={index}>
              <h1 className='text-white'>{img["author"]["name"]}</h1>
              <h2 className='text-white font-bold'>{img["content"]}</h2>
            </div>
            
          ) : ''}
        </div>
  )
}
export default Portfolios
