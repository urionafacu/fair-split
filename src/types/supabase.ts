export type Income = {
  id: number;
  name: string;
  amount: number;
  created_at: string;
};

export type Expense = {
  id: number;
  name: string;
  amount: number;
  created_at: string;
};

export type Database = {
  incomes: Income;
  expenses: Expense;
};
