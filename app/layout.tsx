"use client"

import Footer from '@/components/Footer/Footer'
import Mailing from '@/components/MailingForm/Mailing'
import Navbar from '@/components/Navbar/Navbar'
import { usePathname } from 'next/navigation'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        {children}
        {
          pathname !== "/auth/signup" && pathname !== "/auth/login"
            ?
            <>
              <Mailing />
              <Footer />
            </>
            :
            null
        }
      </body>
    </html>
  )
}
