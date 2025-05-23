import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/primitives/card'
import { Progress } from '@/components/primitives/progress'
import { formatCurrency } from '@/utils/numberFormat'

interface ExpenseSummaryProps {
  totalExpenses: number
  partFacu: number
  partMica: number
}

export const ExpenseSummary = ({
  totalExpenses = 0,
  partFacu = 0,
  partMica = 0,
}: ExpenseSummaryProps) => {
  const percentageFacu = (partFacu / totalExpenses) * 100
  const percentageMica = (partMica / totalExpenses) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resumen de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total de gastos:</span>
            <span className="text-2xl font-bold">{formatCurrency(totalExpenses)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Parte de Facu:</span>
              <span className="font-semibold">{formatCurrency(partFacu)}</span>
            </div>
            <Progress value={percentageFacu} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Parte de Mica:</span>
              <span className="font-semibold">{formatCurrency(partMica)}</span>
            </div>
            <Progress value={percentageMica} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
