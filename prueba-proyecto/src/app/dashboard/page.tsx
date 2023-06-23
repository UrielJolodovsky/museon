import NextAuthProvider from './layout'
import Header from './components/Header'
import FirstLanding from '@/components/start/FirstLanding'

export default function Dashboard() {

  return (
    <>
      <NextAuthProvider>
        <div className='w-full h-screen flex bg-dashBack'>
          {/* <header className='w-full'>
            <Header />
          </header> */}
          <FirstLanding />
        </div>
      </NextAuthProvider>
    </>
  )
}