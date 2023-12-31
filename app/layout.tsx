"use client"
import './globals.css'
import { Inter } from 'next/font/google' 
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextUIProvider } from '@nextui-org/react'
import { AnimatePresence } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <NextUIProvider>
                <ReactQueryDevtools />
              <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
                  
                  {children}
              </AnimatePresence>
            </NextUIProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
