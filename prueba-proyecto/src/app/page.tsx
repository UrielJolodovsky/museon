import FirstLanding from '@/components/start/FirstLanding'
import dir_url from '@/lib/url'
import Image from 'next/image'

export default function Home() {
  console.log(dir_url)
  return (
    <>
      <FirstLanding />
    </>
  )
}
