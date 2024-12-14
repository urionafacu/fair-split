import React from "react";
import ExpenseSplitter from "@/components/ExpenseSplitter";
import { fetchIncomes } from "@/lib/services/incomeService";
import { fetchExpenses } from "@/lib/services/expenseService";

export const revalidate = 0;

export default async function Home() {
  const [incomes, expenses] = await Promise.all([
    fetchIncomes(),
    fetchExpenses(),
  ]);

  return <ExpenseSplitter incomes={incomes} expenses={expenses} />;
}
