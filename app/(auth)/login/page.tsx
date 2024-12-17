import Image from 'next/image'
// import LoginImage from '@/app/images/LoginImage.jpg'
import Logo from '@/app/images/FairSplitLogo.png'
import LoginForm from '@/organisms/LoginForm'

const Login = () => {
  return (
    <main className='page-container'>
      <section className='flex flex-row items-center gap-4 mt-10'>
        <Image src={Logo} priority alt='logo' className='size-20' />
        <h1 className='text-2xl font-extrabold text-dark-green'>FairSplit</h1>
      </section>
      <LoginForm className='mt-12' />
    </main>
  )
}

export default Login
