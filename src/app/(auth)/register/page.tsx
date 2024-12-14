import Logo from '@/app/images/FairSplitLogo.png'
import RegisterForm from '@/organisms/RegisterForm'
import Image from 'next/image'

const Register = () => {
  return (
    <main className='page-container'>
      <div className='flex flex-row justify-center'>
        <Image src={Logo} alt='logo' className='size-16' />
      </div>
      <h1 className='text-primary font-bold mt-4'>Ingresa tus datos de registro</h1>

      <RegisterForm className='mt-4' />
    </main>
  )
}

export default Register
