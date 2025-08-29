"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketIcon, AlertTriangle, TrendingUp, Clock } from "lucide-react";

interface StatsCardsProps {
  totalTickets: number;
  openTickets: number;
  resolutionRate: number;
  avgResolutionTime: number;
}

export function StatsCards({
  totalTickets,
  openTickets,
  resolutionRate,
  avgResolutionTime,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      description: "All time",
      icon: TicketIcon,
      gradient: "from-blue-500/20 to-indigo-600/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Open Tickets",
      value: openTickets,
      description: "Needs attention",
      icon: AlertTriangle,
      gradient: "from-orange-500/20 to-red-600/20",
      iconColor: "text-orange-400",
    },
    {
      title: "Resolution Rate",
      value: `${resolutionRate}%`,
      description: "Tickets resolved",
      icon: TrendingUp,
      gradient: "from-green-500/20 to-emerald-600/20",
      iconColor: "text-green-400",
    },
    {
      title: "Avg Resolution Time",
      value: avgResolutionTime.toFixed(1),
      description: "Days",
      icon: Clock,
      gradient: "from-purple-500/20 to-violet-600/20",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-slate-600/30 shadow-xl"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200 text-balance">
              {stat.title}
            </CardTitle>
            <div
              className={`p-2 bg-gradient-to-br ${stat.gradient} rounded-lg`}
            >
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-slate-400">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
