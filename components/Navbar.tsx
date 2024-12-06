import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div>
      <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
        <Link href="/" className='flex items-center gap-1'>
        <Image
        src="/icons/logo.svg"
        width={32}
        height={32}
        alt='we-meet'
        className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>We-Meet</p>
        </Link>
        <div className="flex-between gap-5">
          <SignedIn>
            <UserButton afterSwitchSessionUrl='/sign-in'/>
          </SignedIn>
          
         <MobileNav/>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
