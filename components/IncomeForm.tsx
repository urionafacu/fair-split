import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Income } from "@/types/supabase";

interface IncomeFormProps {
  incomes: Income[];
  setIncomes: React.Dispatch<React.SetStateAction<Income[]>>;
}

export default function IncomeForm({ incomes, setIncomes }: IncomeFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: Income["id"]
  ) => {
    const value = e.target.value;
    setIncomes((incomes) => {
      const income = incomes.find((i) => i.id === id)!;
      income.amount = Number(value);
      return [income, ...incomes.filter((i) => i.id === id)];
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incomes.map((inc) => (
            <div key={`${inc.id}-${inc.name}`}>
              <Label htmlFor={`income-${inc.name}`}>
                Ingreso de {inc.name}
              </Label>
              <Input
                id="incomeFacu"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                value={inc.amount}
                onChange={(e) => handleChange(e, inc.id)}
                placeholder="Ingresa tu ingreso"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
