import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IncomeFormProps {
  incomeFacu: string;
  incomeMica: string;
  setIncomeFacu: (income: string) => void;
  setIncomeMica: (income: string) => void;
}

export default function IncomeForm({
  incomeFacu,
  incomeMica,
  setIncomeFacu,
  setIncomeMica,
}: IncomeFormProps) {
  const handleIncomeChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || /^\d+$/.test(value)) {
        setter(value);
      }
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="incomeFacu">Tu ingreso</Label>
            <Input
              id="incomeFacu"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={incomeFacu}
              onChange={handleIncomeChange(setIncomeFacu)}
              placeholder="Ingresa tu ingreso"
            />
          </div>
          <div>
            <Label htmlFor="incomeMica">Ingreso de Mica</Label>
            <Input
              id="incomeMica"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={incomeMica}
              onChange={handleIncomeChange(setIncomeMica)}
              placeholder="Ingresa el ingreso de Mica"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
