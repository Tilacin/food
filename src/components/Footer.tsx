import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className='h-12 md:24 p-4 md:h-16 xl:px-20 lg:px-10 text-yellow-300 flex  items-center  justify-between bg-black border-t-2 border-t-yellow-300'>
      <Link href="/" className=' text-xl font-bold font-serif'>CulinArt
      
      </Link>
      <Link href="https://github.com/Tilacin">
      <Image  src="/tilacin.png"  width={120} height={120} alt="cart" className='w-auto' />
      </Link>
     
    </div>
  )
}

export default Footer