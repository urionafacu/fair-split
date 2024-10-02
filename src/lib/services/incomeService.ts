import { supabase } from "../supabaseClient";
import { Income } from "@/types/supabase";
import { revalidatePath } from "next/cache";

export async function fetchIncomes(): Promise<Income[]> {
  const { data, error } = await supabase.from("income").select("*");

  if (error) {
    console.error("Error fetching incomes:", error);
    return [];
  }
  return data ?? [];
}

export async function saveIncome(name: string, amount: number): Promise<void> {
  const { error } = await supabase.from("income").insert([{ name, amount }]);

  if (error) {
    console.error("Error inserting income:", error);
    throw error;
  }
  revalidatePath("/");
}
