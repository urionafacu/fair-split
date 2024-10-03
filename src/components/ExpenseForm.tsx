import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Expense } from "@/types";
import { Expense as SupabaseExpense } from "@/types/supabase";
import { Loader2 } from "lucide-react";
import { saveExpense } from "@/lib/services/expenseService";

interface ExpenseFormProps {
  addExpense: (expense: SupabaseExpense) => void;
}

export default function ExpenseForm({ addExpense }: ExpenseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newExpense, setNewExpense] = useState<Expense>({
    name: "",
    amount: 0,
  });

  const handleAddExpense = async () => {
    const amount = Number(newExpense.amount);
    if (!newExpense.name || amount === 0) return;
    setIsLoading(true);
    try {
      const data = await saveExpense(newExpense.name, newExpense.amount);
      addExpense(data);
      setNewExpense({ name: "", amount: 0 });
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setNewExpense({ ...newExpense, amount: Number(e.target.value) });
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
          <Button disabled={isLoading} onClick={handleAddExpense}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Agregar Gasto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
