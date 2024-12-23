import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#669396',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`${openSans.className} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
