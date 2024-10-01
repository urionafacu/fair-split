import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <p>Total de gastos: ${totalExpenses.toFixed(2)}</p>
        <p>Tu parte: ${partFacu.toFixed(2)}</p>
        <p>Parte de tu novia: ${partMica.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
