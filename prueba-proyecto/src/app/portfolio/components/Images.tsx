import React, { useEffect, useState } from 'react'
import { PortfolioProps } from '@/types' 

const Images = () => {
    const [image, setImage] = useState<PortfolioProps[]>([])
    const [imageSended , setImageSended] = useState(false) 

    useEffect(() => {
        setImageSended(false)
    }, [imageSended])

  return (
    <div>
      
    </div>
  )
}

export default Images
