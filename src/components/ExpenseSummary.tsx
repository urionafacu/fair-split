import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/numberFormat";

interface ExpenseSummaryProps {
  totalExpenses: number;
  partFacu: number;
  partMica: number;
}

export default function ExpenseSummary({
  totalExpenses,
  partFacu,
  partMica,
}: ExpenseSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total de gastos: {formatCurrency(totalExpenses)}</p>
        <p>Parte de Facu: {formatCurrency(partFacu)}</p>
        <p>Parte de Mica: {formatCurrency(partMica)}</p>
      </CardContent>
    </Card>
  );
}
