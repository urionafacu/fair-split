'use client'

import Image from 'next/image'
import Logo from '@/app/images/FairSplitLogo.png'
import { Props } from './header.types'
import { useEffect, useTransition } from 'react'
import { Button } from '@/components/primitives/button'
import { logoutAction } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { selectInitialize, useAuthStore } from '@/stores/auth.store'

export const Header = ({ user, groups }: Props) => {
  const initialize = useAuthStore(selectInitialize)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    initialize(user, groups!)
  }, [])

  const handleLogout = async () => {
    startTransition(async () => {
      await logoutAction()
      router.replace('/login')
    })
  }

  return (
    <header className="flex w-full mb-6 mt-4">
      <div className="flex flex-col justify-between w-full gap-4 px-6 lg:px-20">
        <div className="flex flex-row justify-between">
          <section className="flex flex-row gap-6">
            <Image src={Logo} alt="logo" className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40" />
            <h1 className="text-4xl font-bold text-primary self-center">FairSplit</h1>
          </section>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="self-center"
            disabled={isPending}
          >
            Salir
          </Button>
        </div>
        <h4 className="text-lg font-normal text-primary">
          Ingresa tus gastos mensuales y divídelos proporcionalmente con tu acompañante.
        </h4>
      </div>
    </header>
  )
}
