"use client";

import { Button } from "@/components/ui/button";
import { Plus, TicketIcon } from "lucide-react";

interface DashboardHeaderProps {
  onCreateTicket: () => void;
}

export function DashboardHeader({ onCreateTicket }: DashboardHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm border-b border-slate-600/30 px-4 sm:px-6 py-4 shadow-lg sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
            <TicketIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            NexusDesk
          </h1>
        </div>
        <Button
          onClick={onCreateTicket}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
        >
          <Plus className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">New Ticket</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>
    </header>
  );
}
