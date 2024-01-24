import Navbar from '@/components/navbar'
import { Toaster } from 'sonner'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const disableNavbar = ['auth', 'admin', 'member']

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { pathname } = useRouter()

  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        {!disableNavbar.includes(pathname.split('/')[1]) && <Navbar />}
        <Component {...pageProps} />
        <Toaster position="top-center" richColors />
      </div>
    </SessionProvider>
  )
}
