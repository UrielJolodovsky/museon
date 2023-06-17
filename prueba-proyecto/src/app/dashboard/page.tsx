import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard() {
  const DataNav = [
    {
      id: 1,
      title: 'Home',
    },
    {
      id: 2,
      title: 'About',
    },
    {
      id: 3,
      title: 'Contact',
    },
    {
      id: 4,
      title: 'Museums',
    }
  ]

  return (
    <>
      <div className='w-full h-screen flex bg-dashBack'>
        <nav className='w-full h-24 bg-navColor flex flex-row justify-center items-center gap-16'>
          <div className='w-1/5 p-16'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <ul className='w-3/5 h-full flex flex-row gap-10 justify-end items-center'>
            {DataNav.map(({ id, title }) =>
              <li key={id} className=''>
                <Link href={"#"}>
                  <h1 className='text-xl font-bold'>{title}</h1>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}