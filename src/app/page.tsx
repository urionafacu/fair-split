"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// ExpenseList component
function ExpenseList({ expenses }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell>{expense.name}</TableCell>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ExpenseSummary component
function ExpenseSummary({ totalExpenses, partFacu, partMica }) {
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

// ExpenseChart component
function ExpenseChart({ expenses, partFacu, partMica }) {
  const data = [
    { name: "Tu parte", value: partFacu },
    { name: "Parte de tu novia", value: partMica },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Main ExpenseSplitter component
export default function ExpenseSplitter() {
  const [incomeFacu, setIncomeFacu] = useState(0);
  const [incomeMica, setIncomeMica] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: 0 });

  const addExpense = () => {
    if (newExpense.name && newExpense.amount > 0) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ name: "", amount: 0 });
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalIncome = incomeFacu + incomeMica;
  const percentageFacu = incomeFacu / totalIncome || 0;
  const percentageMica = incomeMica / totalIncome || 0;
  const partFacu = percentageFacu * totalExpenses;
  const partMica = percentageMica * totalExpenses;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Divisor de Gastos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="incomeFacu">Tu ingreso</Label>
                <Input
                  id="incomeFacu"
                  type="number"
                  value={incomeFacu}
                  onChange={(e) => setIncomeFacu(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="incomeMica">Ingreso de tu novia</Label>
                <Input
                  id="incomeMica"
                  type="number"
                  value={incomeMica}
                  onChange={(e) => setIncomeMica(Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
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
                    setNewExpense({
                      ...newExpense,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </div>
              <Button onClick={addExpense}>Agregar Gasto</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <ExpenseList expenses={expenses} />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseSummary
          totalExpenses={totalExpenses}
          partFacu={partFacu}
          partMica={partMica}
        />
        <ExpenseChart
          expenses={expenses}
          partFacu={partFacu}
          partMica={partMica}
        />
      </div>
    </div>
  );
}
