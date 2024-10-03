import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface ExpenseChartProps {
  partFacu: number;
  partMica: number;
}

const COLORS = ["#0088FE", "#00C49F"];

export default function ExpenseChart({
  partFacu,
  partMica,
}: ExpenseChartProps) {
  const data = [
    { name: "Parte de Facu", value: partFacu },
    { name: "Parte de Mica", value: partMica },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
