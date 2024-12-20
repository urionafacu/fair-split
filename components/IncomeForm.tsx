'use client'

import { useState, useEffect } from 'react'
import { Income } from '@/types/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil } from 'lucide-react'
// import { updateIncomes } from '@/app/actions/update-income'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface IncomeDisplayProps {
  incomes?: Income[]
  setIncomes: React.Dispatch<React.SetStateAction<Income[]>>
}

export default function IncomeDisplay({ incomes = [], setIncomes }: IncomeDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editableIncomes, setEditableIncomes] = useState<Income[]>([])

  useEffect(() => {
    if (incomes && incomes.length > 0) {
      setEditableIncomes(incomes)
    }
  }, [incomes])

  const handleChange = (value: string, id: Income['id']) => {
    setEditableIncomes((current) =>
      current.map((income) => (income.id === id ? { ...income, amount: Number(value) } : income)),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // const result = await updateIncomes(editableIncomes)
    // if (result.success) {
    //   setIncomes(editableIncomes)
    //   setIsOpen(false)
    // } else {
    //   // Manejar el error, tal vez mostrar un mensaje al usuario
    //   console.error('Failed to update incomes')
    // }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount)
  }

  if (!incomes || incomes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ingresos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>No hay ingresos registrados</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle>Ingresos</CardTitle>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Pencil className='h-4 w-4' />
              <span className='sr-only'>Editar ingresos</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Editar Ingresos</DrawerTitle>
            </DrawerHeader>
            <div className='p-4'>
              <form onSubmit={handleSubmit} className='space-y-4'>
                {editableIncomes.map((inc) => (
                  <div key={`edit-${inc.id}-${inc.name}`}>
                    <Label htmlFor={`income-${inc.name}`}>Ingreso de {inc.name}</Label>
                    <Input
                      id={`income-${inc.name}`}
                      type='text'
                      inputMode='numeric'
                      pattern='\d*'
                      value={inc.amount}
                      onChange={(e) => handleChange(e.target.value, inc.id)}
                      placeholder='Ingresa el ingreso'
                    />
                  </div>
                ))}
                <Button type='submit' className='w-full'>
                  Guardar cambios
                </Button>
              </form>
            </div>
          </DrawerContent>
        </Drawer>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {incomes.map((inc) => (
            <div key={`${inc.id}-${inc.name}`} className='flex justify-between items-center'>
              <Label>Ingreso de {inc.name}</Label>
              <span className='text-lg font-medium'>{formatCurrency(inc.amount)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
