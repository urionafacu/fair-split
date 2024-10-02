export type Income = {
  id?: number;
  created_at?: string;
  name: string;
  amount: number;
};

export type Expense = {
  id?: number;
  created_at?: string;
  name: string;
  amount: number;
};

export type Database = {
  incomes: Income;
  expenses: Expense;
};
