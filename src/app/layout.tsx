import type { Metadata } from 'next'
import './globals.css'
import { Open_Sans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const openSans = Open_Sans({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Fair Split',
  description: 'Web App for couples to manage shared expenses',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
      </head>
      <body className={`${openSans.className} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
