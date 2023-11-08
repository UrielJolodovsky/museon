import React from 'react'

const VideoPlay = () => {
  return (
    <div className='w-full lg:w-1/3 h-full md:h-2/5 flex justify-center items-center order-1 lg:order-2'>
      <div className='w-full h-full flex justify-center items-center rounded-2xl'>
        <video
          className='h-[246px] w-[610px] rounded-xl border-0'
          src="https://res.cloudinary.com/dxt2lvdt3/video/upload/v1691413761/videolanding.mp4"
          autoPlay
          muted
          loop />
      </div>
    </div>
  )
}

export default VideoPlay