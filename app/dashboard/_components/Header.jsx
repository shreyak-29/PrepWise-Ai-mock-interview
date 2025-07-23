"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {
  const pathname = usePathname()
  useEffect(()=>{
    console.log(pathname)
  },[])

  return (
    <div className=' flex p-4 items-center justify-between bg-white shadow-md'>
      <Image src = {'/logo.png'} width={160} height = {100} alt = 'logo'/>
      <ul className='hidden md:flex gap-6 '>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
        ${pathname=='/dashboard' && 'text-primary font-bold'}
        `}
        >Dashboard</li>
        
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
        ${pathname=='/question' && 'text-primary font-bold'}
        `}>Question</li>
        
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
        ${pathname=='/upgrade' && 'text-primary font-bold'}
        `}>Upgrade</li>
        
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
        ${pathname=='/howitworks' && 'text-primary font-bold'}
        `}>How it works?</li>
      </ul>
   <UserButton/>
    </div>
  )
}

export default Header



