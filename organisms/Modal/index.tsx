'use client'

import React, { createContext, useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import useIsMobile from '@/hooks/useIsMobile'

interface ModalContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  const Component = isMobile ? Drawer : Dialog
  return (
    <ModalContext.Provider value={{ open, setOpen, isMobile }}>
      <Component open={open} onOpenChange={setOpen}>
        {children}
      </Component>
    </ModalContext.Provider>
  )
}

export function ModalTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalTrigger must be used within Modal')

  const Component = context.isMobile ? DrawerTrigger : DialogTrigger
  return <Component asChild>{children}</Component>
}

export function ModalContent({ children }: { children: React.ReactNode }) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalContent must be used within Modal')

  const Component = context.isMobile ? DrawerContent : DialogContent
  return <Component>{children}</Component>
}

export function ModalHeader({ children }: { children: React.ReactNode }) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalHeader must be used within Modal')

  const Component = context.isMobile ? DrawerHeader : DialogHeader
  return <Component>{children}</Component>
}

export function ModalTitle({ children }: { children: React.ReactNode }) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalTitle must be used within Modal')

  const Component = context.isMobile ? DrawerTitle : DialogTitle
  return <Component>{children}</Component>
}
