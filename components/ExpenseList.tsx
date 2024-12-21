import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash2, Search } from 'lucide-react'
import { formatCurrency } from '@/utils/numberFormat'
import { Expense } from '@/types/expenses.types'
import { Input } from '@/molecules'

interface ExpenseListProps {
  expenses: Expense[]
  onDeleteExpense: (index: number) => void
}

export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <span>Lista de Gastos</span>
          <div className='flex items-center space-x-2'>
            <Search className='w-4 h-4 text-gray-500' />
            <Input
              placeholder='Buscar gasto...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='max-w-xs'
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead className='w-[100px]'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className='font-medium'>{expense.name}</TableCell>
                <TableCell>{formatCurrency(Number(expense.amount))}</TableCell>
                <TableCell>
                  <Button variant='ghost' size='icon' onClick={() => onDeleteExpense(expense.id!)}>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredExpenses.length === 0 && (
          <div className='text-center py-4 text-gray-500'>No se encontraron gastos</div>
        )}
      </CardContent>
    </Card>
  )
}
