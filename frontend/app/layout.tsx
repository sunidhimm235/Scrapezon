import Sidebar from '@/Components/Sidebar'
import Header from '@/Components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SCRAPEZON',
  description: 'Web Scraping from Amazon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex {inter.className}'>
        <Sidebar />

        <main className='p-10 max-w-7xl w-full mx-auto overflow-y-auto'>
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
