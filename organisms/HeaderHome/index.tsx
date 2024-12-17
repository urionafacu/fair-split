import Image from 'next/image'
import Logo from '@/app/images/FairSplitLogo.png'

const HeaderHome = () => {
  return (
    <header className='flex w-full mb-6 mt-4'>
      <div className='flex flex-col justify-between w-full gap-4 px-6 lg:px-20'>
        <div className='flex flex-row gap-6'>
          <Image src={Logo} alt='logo' className='w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40' />
          <div className='flex flex-col justify-evenly gap-2'>
            <h1 className='text-4xl font-bold text-dark-green'>FairSplit</h1>
            {/* <Link href='/login'>
              <Button>Ingresar</Button>
            </Link> */}
          </div>
        </div>
        <h4 className='text-lg font-normal text-primary'>
          Ingresa tus gastos mensuales y divídelos proporcionalmente con tu acompañante.
        </h4>
      </div>
    </header>
  )
}

export default HeaderHome
