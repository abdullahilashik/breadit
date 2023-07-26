import Link from 'next/link'
import React from 'react'
import { Icons } from './Icons'
import { buttonVariants } from './ui/Button'

const Navbar = async () => {
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
        <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
            {/* logo */}
            <Link href={'/'} className='flex gap--2 items-center gap-2'>
                <Icons.logo className='w-8 h-8 sm:w-6 sm:h-6'/>
                <p className="hidden text-zinc-700 text-sm font-medium md:block">Breadit</p>
            </Link>
            {/* searchbar */}
            {/* sign in */}
            <Link href={'/sign-in'} className={buttonVariants({class:'px-4 py-1 text-[12px] h-fit'})}>Sign in</Link>
        </div>
    </div>
  )
}

export default Navbar