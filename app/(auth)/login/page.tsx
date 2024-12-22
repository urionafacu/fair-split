import Image from 'next/image'
import LoginImage from '@/app/images/LoginImage.jpg'
import Logo from '@/app/images/FairSplitLogo.png'
import LoginForm from '@/organisms/LoginForm'

const Login = () => {
  return (
    <main className='page-container flex'>
      {/* Left column - hidden on mobile */}
      <section className='hidden md:flex md:w-1/2 flex-col items-center justify-center'>
        <Image
          src={LoginImage}
          alt='Login illustration'
          priority
          className='max-w-[600px] w-full h-auto'
        />
        <p className='text-center text-gray-600 mt-8 max-w-[600px]'>
          Lorem ipsum dolor sit amet consectetur. Eget vulputate fames nisl lacinia. Diam id cursus
          auctor egestas diam auctor id id. At amet condimentum ultricies euismod vivamus egestas
          faucibus. Justo amet augue venenatis augue consectetur purus adipiscing pellentesque vel.
        </p>
      </section>

      {/* Right Column - Full width on mobile */}
      <section className='w-full md:w-1/2 md:p-12'>
        <div className='flex flex-row items-center gap-4 mt-10'>
          <Image src={Logo} priority alt='logo' className='size-20' />
          <h1 className='text-2xl font-extrabold text-primary'>FairSplit</h1>
        </div>
        <LoginForm className='mt-12' />
      </section>
    </main>
  )
}

export default Login
