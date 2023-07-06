import Link from 'next/link'
import React from 'react'

const NavLanding = () => {
  const DataNav = [
    {
        id: 1,
        title: 'Inicio',
        link: '#'
    },
    {
        id: 2,
        title: 'Colecciones',
        link: '#'
    },
    {
        id: 3,
        title: 'Ayuda',
        link: '#'
    },
    {
        id: 4,
        title: 'Contacto',
        link: '#'
    }
  ]  
    
  return (
    <section className='w-full h-screen bg-landing flex flex-col justify-center items-center'>
        <nav className='w-full h-[127px] flex justify-center items-center'>
            <ul>
                {DataNav.map(({ id, title, link }) => {
                    return(
                        <li key={id} className=''>
                            <Link href={"/"}>
                                <h1>{title}</h1>
                            </Link>

                        </li>
                    )    
                    })}
            </ul>
        </nav>
    </section>   
    )
}

export default NavLanding