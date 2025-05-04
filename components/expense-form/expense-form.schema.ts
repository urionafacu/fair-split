import { z } from "zod";

export const expenseSchema = z.object({
  name: z
    .string()
    .max(30, "El nombre no debe superar los 30 caracteres")
    .min(1, "Nombre es requerido"),
  amount: z.coerce
    .number({
      invalid_type_error: "Monto debe ser un número",
      required_error: "El monto es requerido",
    })
    .int()
    .positive("El monto debe ser un número positivo"),
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;
