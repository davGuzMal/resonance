"use client"
import './globals.css'
import { Inter } from 'next/font/google' 
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextUIProvider } from '@nextui-org/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

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
            {children}
          </NextUIProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
