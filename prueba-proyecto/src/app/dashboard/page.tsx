import NextAuthProvider from './layout'
import Header from './components/Header'
import Museos from './components/Museos'

export default function Dashboard() {

  return (
    <>
      <NextAuthProvider>
        <div className='w-full h-screen flex flex-col bg-dashBack'>
          <Header />
          <Museos />
        </div>
      </NextAuthProvider>
    </>
  )
}