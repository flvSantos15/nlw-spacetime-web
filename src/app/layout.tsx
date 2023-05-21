import { ReactNode } from 'react'
import { cookies } from 'next/headers'

import './globals.css'
import './date-picker.css'

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree
} from 'next/font/google'

import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Copyright } from '@/components/Copyright'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree'
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construida com React, Next.js, TailwindCSS e TypeScript.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAutheticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} font-[sans] bg-gray-900 text-gray-100`}
      >
        <main className="grid grid-cols-1 xl:grid-cols-2 overflow-y-auto min-h-screen">
          {/* Left */}
          <div className="flex flex-col items-start justify-between overflow-hidden px-12 md:px-20 xl:px-28 py-10 md:py-12 xl:py-16 relative border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"></div>

            {/* Stripes */}
            <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

            {isAutheticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </div>

          {/* Right */}
          <div className="flex flex-col max-h-screen overflow-y-auto bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
