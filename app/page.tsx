"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "sonner";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard-header";
import { HeroSection } from "@/components/hero-section";
import { StatsCards } from "@/components/stats-cards";
import { ChartsSection } from "@/components/charts-section";
import { TicketList } from "@/components/ticket-list";
import { CreateTicketDialog } from "@/components/create-ticket-dialog";
import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";

interface Ticket {
  id: string;
  title: string;
  description: string;
  requester: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  createdAt: Date;
  resolvedAt?: Date;
}

interface ParsedTicket {
  id: string;
  title: string;
  description: string;
  requester: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
  resolvedAt?: string;
}

export default function ITHelpdeskDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const savedTickets = localStorage.getItem("helpdesk-tickets");
    if (savedTickets) {
      const parsedTickets = JSON.parse(savedTickets).map(
        (ticket: ParsedTicket) => ({
          ...ticket,
          createdAt: new Date(ticket.createdAt),
          resolvedAt: ticket.resolvedAt
            ? new Date(ticket.resolvedAt)
            : undefined,
        })
      );
      setTickets(parsedTickets);
    } else {
      // Initialize with sample data
      const sampleTickets: Ticket[] = [
        {
          id: "TK-001",
          title: "Email not working",
          description: "Cannot send or receive emails in Outlook",
          requester: "john.doe@company.com",
          priority: "High",
          status: "Open",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: "TK-002",
          title: "Printer offline",
          description: "Office printer showing offline status",
          requester: "jane.smith@company.com",
          priority: "Medium",
          status: "In Progress",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
          id: "TK-003",
          title: "Password reset request",
          description: "Need to reset Active Directory password",
          requester: "mike.johnson@company.com",
          priority: "Low",
          status: "Resolved",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
      ];
      setTickets(sampleTickets);
      localStorage.setItem("helpdesk-tickets", JSON.stringify(sampleTickets));
    }
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem("helpdesk-tickets", JSON.stringify(tickets));
    }
  }, [tickets]);

  const createTicket = (formData: FormData) => {
    const newTicket: Ticket = {
      id: `TK-${String(tickets.length + 1).padStart(3, "0")}`,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      requester: formData.get("requester") as string,
      priority: formData.get("priority") as "High" | "Medium" | "Low",
      status: "Open",
      createdAt: new Date(),
    };
    setTickets([...tickets, newTicket]);
    setIsCreateDialogOpen(false);
  };

  const editTicket = (ticketId: string, updatedData: Partial<Ticket>) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, ...updatedData } : ticket
      )
    );
  };

  const deleteTicket = (ticketId: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
  };

  const updateTicketStatus = (
    ticketId: string,
    newStatus: "Open" | "In Progress" | "Resolved"
  ) => {
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          const updatedTicket = { ...ticket, status: newStatus };
          if (newStatus === "Resolved" && !ticket.resolvedAt) {
            updatedTicket.resolvedAt = new Date();
          }
          return updatedTicket;
        }
        return ticket;
      })
    );
  };

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const inProgressTickets = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;
  const resolvedTickets = tickets.filter((t) => t.status === "Resolved").length;
  const resolutionRate =
    totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;

  const avgResolutionTime =
    tickets
      .filter((t) => t.resolvedAt)
      .reduce((acc, ticket) => {
        const timeDiff =
          ticket.resolvedAt!.getTime() - ticket.createdAt.getTime();
        return acc + timeDiff / (1000 * 60 * 60 * 24); // Convert to days
      }, 0) / resolvedTickets || 0;

  const statusChartData = [
    { name: "Open", value: openTickets, color: "#3b82f6" },
    { name: "In Progress", value: inProgressTickets, color: "#eab308" },
    { name: "Resolved", value: resolvedTickets, color: "#22c55e" },
  ];

  const priorityChartData = [
    {
      name: "High",
      count: tickets.filter((t) => t.priority === "High").length,
    },
    {
      name: "Medium",
      count: tickets.filter((t) => t.priority === "Medium").length,
    },
    { name: "Low", count: tickets.filter((t) => t.priority === "Low").length },
  ];

  const handleNavigation = (section: string) => {
    if (section === "main-dashboard") {
      setActiveTab("dashboard");
      setTimeout(() => {
        const element = document.getElementById("main-dashboard");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (section === "main-tickets") {
      setActiveTab("tickets");
      setTimeout(() => {
        const element = document.getElementById("main-tickets");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            border: "1px solid #475569",
            color: "#f1f5f9",
          },
        }}
      />

      <DashboardHeader
        onCreateTicket={() => setIsCreateDialogOpen(true)}
        onNavigate={handleNavigation}
      />

      <HeroSection />

      <motion.div
        className="p-4 sm:p-6"
        id="main-dashboard"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 3 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.2 }}
            >
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-600/30">
                <TabsTrigger
                  value="dashboard"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white text-slate-300"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="tickets"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white text-slate-300"
                >
                  Tickets
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="dashboard" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.5 }}
              >
                <StatsCards
                  totalTickets={totalTickets}
                  openTickets={openTickets}
                  resolutionRate={resolutionRate}
                  avgResolutionTime={avgResolutionTime}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.8 }}
              >
                <ChartsSection
                  statusChartData={statusChartData}
                  priorityChartData={priorityChartData}
                />
              </motion.div>
            </TabsContent>

            <TabsContent
              value="tickets"
              className="space-y-6"
              id="main-tickets"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <TicketList
                  tickets={tickets}
                  onUpdateTicketStatus={updateTicketStatus}
                  onEditTicket={editTicket}
                  onDeleteTicket={deleteTicket}
                />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>

      <CreateTicketDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTicket={createTicket}
      />

      <BackToTop />

      <Footer />
    </div>
  );
}
