import Image from 'next/image'
import LoginImage from '@/app/images/LoginImage.jpg'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='page-container flex'>
      <section className='hidden md:flex md:w-1/2 flex-col items-center justify-center'>
        <Image
          src={LoginImage}
          alt='Login illustration'
          priority
          className='max-w-[600px] w-full h-auto'
        />
        <h2 className='text-center text-gray-600 font-semibold text-2xl mt-8 max-w-[600px]'>
          La forma moderna de compartir gastos en pareja. División proporcional, automática y sin
          complicaciones.
        </h2>
      </section>
      <section className='w-full md:w-1/2 md:p-6 lg:p-12 flex justify-center'>{children}</section>
    </main>
  )
}
