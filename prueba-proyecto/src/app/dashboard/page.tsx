import NextAuthProvider from './layout'
import Header from './components/Header'

export default function Dashboard() {

  return (
    <>
      <NextAuthProvider>
        <div className='w-full h-screen flex bg-dashBack'>
          <header className='w-full'>
            <Header />
          </header>
        </div>
      </NextAuthProvider>
    </>
  )
}