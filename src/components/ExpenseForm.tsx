import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Expense } from "@/types";

interface ExpenseFormProps {
  addExpense: (expense: Expense) => void;
}

export default function ExpenseForm({ addExpense }: ExpenseFormProps) {
  const [newExpense, setNewExpense] = useState<Expense>({
    name: "",
    amount: 0,
  });

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount > 0) {
      addExpense(newExpense);
      setNewExpense({ name: "", amount: 0 });
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
            />
          </div>
          <div>
            <Label htmlFor="expenseAmount">Monto</Label>
            <Input
              id="expenseAmount"
              type="number"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: Number(e.target.value) })
              }
            />
          </div>
          <Button onClick={handleAddExpense}>Agregar Gasto</Button>
        </div>
      </CardContent>
    </Card>
  );
}
