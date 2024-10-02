import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Expense } from "@/types";
import { saveExpense } from "@/lib/services/expenseService";

interface ExpenseFormProps {
  addExpense: (expense: Expense) => void;
}

export default function ExpenseForm({ addExpense }: ExpenseFormProps) {
  const [newExpense, setNewExpense] = useState<Expense>({
    name: "",
    amount: "",
  });

  const handleAddExpense = () => {
    const amount = parseFloat(newExpense.amount);
    if (newExpense.name && amount > 0) {
      addExpense({ ...newExpense, amount: amount.toString() });
      setNewExpense({ name: "", amount: "" });
      try {
        saveExpense(newExpense.name, amount);
      } catch {}
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setNewExpense({ ...newExpense, amount: value });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Gasto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="expenseName">Nombre del gasto</Label>
            <Input
              id="expenseName"
              value={newExpense.name}
              onChange={(e) =>
                setNewExpense({ ...newExpense, name: e.target.value })
              }
              placeholder="Ingresa el nombre del gasto"
            />
          </div>
          <div>
            <Label htmlFor="expenseAmount">Monto</Label>
            <Input
              id="expenseAmount"
              type="text"
              inputMode="decimal"
              value={newExpense.amount}
              onChange={handleAmountChange}
              placeholder="Ingresa el monto del gasto"
            />
          </div>
          <Button onClick={handleAddExpense}>Agregar Gasto</Button>
        </div>
      </CardContent>
    </Card>
  );
}
