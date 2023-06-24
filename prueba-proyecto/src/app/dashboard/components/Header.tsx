import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {

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

  const { data: session } = useSession()


  return (
    <header className='w-full h-24 bg-navColor flex flex-row justify-center items-center'>
      <nav className='w-full h-full flex flex-row justify-center items-center gap-16'>
        <ul className='w-full h-full flex flex-row gap-5 justify-evenly items-center p-16'>
          {DataNav.map(({ id, title }) =>
            <li key={id} className=''>
              <Link
                className='text-xl font-medium text-white'
                href={"#"}
              >
                {title}
              </Link>
              <div className=''></div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header