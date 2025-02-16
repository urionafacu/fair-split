'use client'

import { useState, useEffect } from 'react'
import { Income } from '@/types/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Input from '@/molecules/input'
import { Label } from '@/components/ui/label'
import { Pencil } from 'lucide-react'
// import { updateIncomes } from '@/app/actions/update-income'
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle } from '@/organisms/Modal'
import { Group } from '@/types/group.types'

interface IncomeDisplayProps {
  group: Group
  // setIncomes: React.Dispatch<React.SetStateAction<Income[]>>
}

export default function IncomeDisplay({ group }: IncomeDisplayProps) {
  const [editableIncomes, setEditableIncomes] = useState<Group['members']>([])

  useEffect(() => {
    if (group && group.members.length > 0) {
      setEditableIncomes(group.members)
    }
  }, [group])

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
    // } else {
    //   console.error('Failed to update incomes')
    // }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount)
  }

  if (!group || group.members.length === 0) {
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
        <Modal>
          <ModalTrigger>
            <Button variant='ghost' size='icon'>
              <Pencil className='h-4 w-4' />
              <span className='sr-only'>Editar ingresos</span>
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Editar Ingresos</ModalTitle>
            </ModalHeader>
            <div className='p-4'>
              <form onSubmit={handleSubmit} className='space-y-4'>
                {editableIncomes.map((inc) => (
                  <Input
                    id={`income-${inc.user.id}`}
                    type='text'
                    inputMode='numeric'
                    pattern='\d*'
                    value={inc.income}
                    onChange={(e) => handleChange(e.target.value, inc.id)}
                    placeholder='Ingresa el ingreso'
                    label={`Ingreso de ${inc.income}`}
                    key={`edit-${inc.id}-${inc.user.firstName}`}
                  />
                ))}
                <div className='pb-safe'>
                  <Button type='submit' className='w-full'>
                    Guardar cambios
                  </Button>
                </div>
              </form>
            </div>
          </ModalContent>
        </Modal>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {group.members.map((inc) => (
            <div
              key={`${inc.id}-${inc.user.firstName}`}
              className='flex justify-between items-center'
            >
              <Label>Ingreso de {inc.user.firstName}</Label>
              <span className='text-lg font-medium'>{formatCurrency(Number(inc.income))}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
