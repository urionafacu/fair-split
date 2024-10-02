import { supabase } from "../supabaseClient";
import { Expense } from "@/types/supabase";
import { revalidatePath } from "next/cache";

export async function fetchExpenses(): Promise<Expense[]> {
  const { data, error } = await supabase.from("expense").select("*");

  if (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
  return data ?? [];
}

export async function saveExpense(name: string, amount: number): Promise<void> {
  const { error } = await supabase.from("expense").insert([{ name, amount }]);

  if (error) {
    console.error("Error inserting expense:", error);
    throw error;
  }
  revalidatePath("/");
}

export async function deleteExpense(id: number): Promise<void> {
  const { error } = await supabase.from("expense").delete().eq("id", id);

  if (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
  revalidatePath("/");
}
