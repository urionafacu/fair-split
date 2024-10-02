import React, { useEffect, useState } from "react";
import { Expense } from "@/types";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";
import { fetchExpenses } from "@/lib/services/expenseService";
import { fetchIncomes } from "@/lib/services/incomeService";

export default function ExpenseSplitter() {
  const [incomeFacu, setIncomeFacu] = useState<string>("");
  const [incomeMica, setIncomeMica] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const obtainIncomes = async () => {
      try {
        const incomes = await fetchIncomes();
        const incomeFacu = incomes.find((i) => i.name === "Facu")?.amount ?? 0;
        setIncomeFacu(String(incomeFacu));
        const incomeMica = incomes.find((i) => i.name === "Mica")?.amount ?? 0;
        setIncomeMica(String(incomeMica));
      } catch {}
    };
    obtainIncomes();
  }, []);

  useEffect(() => {
    const obtainExpenses = async () => {
      try {
        const expenses = await fetchExpenses();
        setExpenses(
          expenses.map((e) => ({ name: e.name, amount: String(e.amount) }))
        );
      } catch {}
    };
    obtainExpenses();
  }, []);

  const addExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (position: number) => {
    setExpenses(expenses.filter((_, i) => i !== position));
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
        <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
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
