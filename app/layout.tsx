import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Open_Sans } from 'next/font/google'
import { Toaster } from '@/components/primitives/toaster'

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Fair Split',
  description: 'La app definitiva para dividir gastos con tu pareja',
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
    <html lang="es">
      <body className={`${openSans.variable} antialiased`}>
        <main>{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
