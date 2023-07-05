import NextAuthProvider from './layout'
import Header from './components/Header'
import Museos from './museos/components/Colecciones'

export default function Dashboard() {

  return (
    <>
      <NextAuthProvider>
        <div className='w-full h-screen flex flex-col bg-dashBack'>
          <Header />
        </div>
      </NextAuthProvider>
    </>
  )
}