import { Expense } from "@/types";

interface StoredData {
  incomeFacu: string;
  incomeMica: string;
  expenses: Expense[];
}

export const saveToLocalStorage = (data: StoredData) => {
  localStorage.setItem("expenseSplitterData", JSON.stringify(data));
};

export const loadFromLocalStorage = (): StoredData | null => {
  const storedData = localStorage.getItem("expenseSplitterData");
  return storedData ? JSON.parse(storedData) : null;
};
