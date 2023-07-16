"use client"
import React, { useEffect, useState } from 'react'
import { PortfolioProps } from '@/types'
import { toast } from 'react-hot-toast'
import dir_url from '@/lib/url'
import axios from 'axios'
import { CldImage } from 'next-cloudinary'

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState<PortfolioProps[]>([])
  const [portfolioEnviado, setPortfolioEnviado] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    getPortfolios()
    setPortfolioEnviado(false)
  }, [portfolioEnviado])

  const getPortfolios = async () => {
    try {
      await axios.get(`${dir_url}/api/portfolio/get`).then((res) => {
        setPortfolios(res.data)
      }).catch((err) => {
        toast.error(err.response.data)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const addPortfolio = async () => {
    try {
      await axios.post(`${dir_url}/api/portfolio/add`, {
        name_portfolio: "name_portfolio",
      }).then((res) => {
        setPortfolios(res.data)
        toast.success('Portfolio created succesfully')
        const id_public = res.data
        const formData = new FormData()
        formData.append('file', selectedFile as Blob | string)
        formData.append('upload_preset', 'museon')
        formData.append('public_id', id_public)
        axios.post('https://api.cloudinary.com/v1_1/dxt2lvdt3/image/upload', formData)
      })
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files: FileList = (event.target as EventTarget & { files: FileList }).files;

      if (files && files.length > 0) {
        const file: File = files[0]
        setSelectedFile(file)

        const reader = new FileReader()
        reader.onload = () => {
          const content: string = reader.result as string
          console.log(content)
        }
        reader.readAsText(file)
      }
    };

    return (
      <div className='bg-formBack w-full h-screen'>
        {Array.isArray(portfolios) ? portfolios.map((portfolio, index) =>
          <div key={index} className='w-58 h-58 bg-dashHover flex flex-wrap'>
            <h2 className='text-white font-bold'>{portfolio["name_portfolio"]}</h2>
            <h1 className='text-white'>{portfolio["author"]["name"]}</h1>
          </div>
        ) : ''}
        <div className='w-36 h-12 flex justify-center items-center'>
          <button onClick={addPortfolio} className='text-center'>
            Add Portfolio
          </button>
        </div>
      </div>
    )
}
export default Portfolios
