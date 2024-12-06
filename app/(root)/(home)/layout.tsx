import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
        <Navbar/>
      
        <div className="flex">
            <Sidebar/>
            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'></section>
        </div>
        <div className="w-full">
      {children}
      </div>
    </main>
  )
}

export default HomeLayout