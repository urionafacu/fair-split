"use client";

import React, { useState } from "react";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";
import { Expense, Income } from "@/types/supabase";
import { deleteExpense as supabaseDeleteExpense } from "@/lib/services/expenseService";

type Props = {
  incomes: Income[];
  expenses: Expense[];
};

export default function ExpenseSplitter({ incomes, expenses }: Props) {
  const [localIncomes, setLocalIncomes] = useState(incomes);
  const [localExpenses, setLocalExpenses] = useState(expenses);

  const addExpense = (newExpense: Expense) => {
    setLocalExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id: Expense["id"]) => {
    setLocalExpenses(expenses.filter((e) => e.id !== id));
    supabaseDeleteExpense(id!);
  };

  const totalExpenses = localExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );
  const totalIncome = localIncomes.reduce(
    (prev, current) => prev + current.amount,
    0
  );
  const percentageFacu = localIncomes[0]
    ? localIncomes[0].amount / totalIncome
    : 0;
  const percentageMica = localIncomes[1]
    ? localIncomes[1].amount / totalIncome
    : 0;
  const partFacu = percentageFacu * totalExpenses;
  const partMica = percentageMica * totalExpenses;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center mt-2">
        Divisor de Gastos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IncomeForm incomes={localIncomes} setIncomes={setLocalIncomes} />
        <ExpenseForm addExpense={addExpense} />
      </div>
      <div className="mt-6">
        <ExpenseList expenses={localExpenses} onDeleteExpense={deleteExpense} />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseSummary
          totalExpenses={totalExpenses}
          partFacu={partFacu}
          partMica={partMica}
        />
        <ExpenseChart partFacu={partFacu} partMica={partMica} />
      </div>
    </div>
  );
}
