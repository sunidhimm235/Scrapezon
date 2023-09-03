import { GlobeAltIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <GlobeAltIcon className='h-64 w-64 text-green-200'/>

      <div className='text-center text-emerald-400 mb-5 mt-5'>
      
      <h1 className='text-3xl mt-2 font-bold'>
        Welcome to the Scrapezon!!
      </h1>

      <h1 className='text-lg italic'>
        Discover a world of valuable information from Amazon's vast marketplace using our cutting-edge web scraping tool.<br />
        Gain real-time access to product data, reviews, prices, and more, empowering smarter decisions and fueling business growth.<br />
        Try it today and harness the power of data!<br />
      </h1>

      </div>
    </div>
  )
}
