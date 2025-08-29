"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartsSectionProps {
  statusChartData: Array<{ name: string; value: number; color: string }>;
  priorityChartData: Array<{ name: string; count: number }>;
}

export function ChartsSection({
  statusChartData,
  priorityChartData,
}: ChartsSectionProps) {
  const filteredStatusData = statusChartData.filter((item) => item.value > 0);
  const filteredPriorityData = priorityChartData.filter(
    (item) => item.count > 0
  );

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-slate-600/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-balance">
            Ticket Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              Open: {
                label: "Open",
                color: "#3b82f6",
              },
              "In Progress": {
                label: "In Progress",
                color: "#eab308",
              },
              Resolved: {
                label: "Resolved",
                color: "#22c55e",
              },
            }}
            className="h-[250px] sm:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {filteredStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-slate-600/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-balance">
            Priority Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              High: {
                label: "High Priority",
                color: "#ef4444",
              },
              Medium: {
                label: "Medium Priority",
                color: "#eab308",
              },
              Low: {
                label: "Low Priority",
                color: "#22c55e",
              },
            }}
            className="h-[250px] sm:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredPriorityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
