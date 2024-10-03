export function formatCurrency(amount: number): string {
  return amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseCurrency(formatted: string): number {
  const cleanString = formatted
    .replace(/[^\d,-]/g, "")
    .replace(".", "")
    .replace(",", ".");
  return parseFloat(cleanString);
}
