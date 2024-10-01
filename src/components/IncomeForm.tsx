import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IncomeFormProps {
  incomeFacu: number;
  incomeMica: number;
  setIncomeFacu: (income: number) => void;
  setIncomeMica: (income: number) => void;
}

export default function IncomeForm({
  incomeFacu,
  incomeMica,
  setIncomeFacu,
  setIncomeMica,
}: IncomeFormProps) {
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
              type="number"
              value={incomeFacu}
              onChange={(e) => setIncomeFacu(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="incomeMica">Ingreso de tu novia</Label>
            <Input
              id="incomeMica"
              type="number"
              value={incomeMica}
              onChange={(e) => setIncomeMica(Number(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
