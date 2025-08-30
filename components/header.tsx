"use client";

import { Button } from "@/components/ui/button";
import {
  Plus,
  TicketIcon,
  LayoutDashboard,
  Ticket,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface DashboardHeaderProps {
  onCreateTicket: () => void;
  onNavigate: (section: string) => void;
}

export function Header({ onCreateTicket, onNavigate }: DashboardHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTitleClick = () => {
    window.location.reload();
  };

  const handleNavigation = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm border-b border-slate-600/30 px-4 sm:px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
            <TicketIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <h1
            onClick={handleTitleClick}
            className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent cursor-pointer hover:from-blue-200 hover:to-indigo-200 transition-all duration-300 hover:scale-105"
          >
            NexusDesk
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate("main-dashboard")}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 min-h-[40px] active:scale-95"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate("main-tickets")}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 min-h-[40px] active:scale-95"
          >
            <Ticket className="h-4 w-4" />
            <span className="font-medium">Tickets</span>
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Button
            onClick={onCreateTicket}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base min-h-[36px] sm:min-h-[40px] active:scale-95"
          >
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">New Ticket</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-600/30">
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => handleNavigation("main-dashboard")}
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 w-full text-left"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button
              onClick={() => handleNavigation("main-tickets")}
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 w-full text-left"
            >
              <Ticket className="h-4 w-4" />
              <span className="font-medium">Tickets</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
