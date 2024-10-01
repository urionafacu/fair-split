import React, { useState } from "react";
import { Expense } from "@/types";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";

export default function ExpenseSplitter() {
  const [incomeFacu, setIncomeFacu] = useState<string>("");
  const [incomeMica, setIncomeMica] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );
  const totalIncome = Number(incomeFacu) + Number(incomeMica);
  const percentageFacu = totalIncome ? Number(incomeFacu) / totalIncome : 0;
  const percentageMica = totalIncome ? Number(incomeMica) / totalIncome : 0;
  const partFacu = percentageFacu * totalExpenses;
  const partMica = percentageMica * totalExpenses;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center mt-2">
        Divisor de Gastos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IncomeForm
          incomeFacu={incomeFacu}
          incomeMica={incomeMica}
          setIncomeFacu={setIncomeFacu}
          setIncomeMica={setIncomeMica}
        />
        <ExpenseForm addExpense={addExpense} />
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
        <ExpenseChart partFacu={partFacu} partMica={partMica} />
      </div>
    </div>
  );
}
