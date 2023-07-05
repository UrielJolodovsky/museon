import { useParams } from 'next/navigation'
import React from 'react'

const Token = () => {
    
    const params = useParams()
    const token = params.slug.toString()

    
  return (
    <div>Token</div>
  )
}

export default Token