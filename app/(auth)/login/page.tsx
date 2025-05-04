import Image from 'next/image'
import Logo from '@/app/images/FairSplitLogo.png'
import { LoginForm } from '@/components/login-form'

const Login = () => {
  return (
    <div className="w-full md:w-96 flex flex-col">
      <div className="flex flex-row items-center gap-4 mt-10">
        <Image src={Logo} priority alt="logo" className="size-20" />
        <h1 className="text-2xl font-extrabold text-primary">FairSplit</h1>
      </div>
      <LoginForm className="mt-12" />
    </div>
  )
}

export default Login
