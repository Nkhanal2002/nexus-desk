"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, CheckCircle, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EditTicketDialog } from "./edit-ticket-dialog";

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

interface TicketListProps {
  tickets: Ticket[];
  onUpdateTicketStatus: (
    ticketId: string,
    newStatus: "Open" | "In Progress" | "Resolved"
  ) => void;
  onEditTicket: (ticketId: string, updatedData: Partial<Ticket>) => void;
  onDeleteTicket: (ticketId: string) => void;
}

const priorityColors = {
  High: "bg-destructive text-destructive-foreground",
  Medium: "bg-yellow-500 text-white",
  Low: "bg-green-500 text-white",
};

const statusColors = {
  Open: "bg-blue-500 text-white",
  "In Progress": "bg-yellow-500 text-white",
  Resolved: "bg-green-500 text-white",
};

export function TicketList({
  tickets,
  onUpdateTicketStatus,
  onEditTicket,
  onDeleteTicket,
}: TicketListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDeleteTicket = (ticket: Ticket) => {
    if (
      window.confirm(
        `Are you sure you want to delete ticket "${ticket.title}"? This action cannot be undone.`
      )
    ) {
      onDeleteTicket(ticket.id);
      toast.success("Ticket deleted successfully!", {
        description: `Ticket "${ticket.title}" has been removed.`,
      });
    }
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setIsEditDialogOpen(true);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      filterPriority === "all" || ticket.priority === filterPriority;
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const groupedTickets = {
    Open: filteredTickets.filter((ticket) => ticket.status === "Open"),
    "In Progress": filteredTickets.filter(
      (ticket) => ticket.status === "In Progress"
    ),
    Resolved: filteredTickets.filter((ticket) => ticket.status === "Resolved"),
  };

  const renderTicketCard = (ticket: Ticket) => (
    <Card
      key={ticket.id}
      className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-slate-600/30 shadow-xl hover:shadow-2xl transition-all duration-200"
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg text-white text-balance">
              {ticket.title}
            </CardTitle>
            <CardDescription className="text-slate-300 text-sm">
              <span className="font-medium text-blue-400">{ticket.id}</span> •{" "}
              {ticket.requester} • Created{" "}
              {ticket.createdAt.toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge className={priorityColors[ticket.priority]}>
              {ticket.priority}
            </Badge>
            <Badge className={statusColors[ticket.status]}>
              {ticket.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-300 mb-4 text-pretty">
          {ticket.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEditTicket(ticket)}
              className="border-slate-600 cursor-pointer text-slate-200 bg-slate-700 hover:bg-slate-700 hover:text-white"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDeleteTicket(ticket)}
              className=" text-red-400 cursor-pointer bg-slate-300 hover:bg-red-400 hover:text-white"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {ticket.status === "Open" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateTicketStatus(ticket.id, "In Progress")}
                className=" cursor-pointer border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
              >
                Start Progress
              </Button>
            )}
            {ticket.status === "In Progress" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateTicketStatus(ticket.id, "Resolved")}
                className=" cursor-pointer border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
              >
                Mark Resolved
              </Button>
            )}
            {ticket.status === "Resolved" && ticket.resolvedAt && (
              <p className="text-sm text-slate-300 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
                Resolved on {ticket.resolvedAt.toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStatusSection = (
    status: "Open" | "In Progress" | "Resolved",
    tickets: Ticket[]
  ) => {
    if (tickets.length === 0) return null; // Hide empty sections

    return (
      <div key={status} className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">{status}</h3>
          <Badge className={`${statusColors[status]} text-xs`}>
            {tickets.length}
          </Badge>
        </div>
        <div className="space-y-3">{tickets.map(renderTicketCard)}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search tickets by ID, title, description, or requester..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-600/30 text-white placeholder:text-slate-400 backdrop-blur-sm"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[140px] sm:w-[180px] bg-slate-800/50 border-slate-600/30 text-white backdrop-blur-sm">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-white hover:bg-slate-700">
                All Priorities
              </SelectItem>
              <SelectItem
                value="High"
                className="text-white hover:bg-slate-700"
              >
                High
              </SelectItem>
              <SelectItem
                value="Medium"
                className="text-white hover:bg-slate-700"
              >
                Medium
              </SelectItem>
              <SelectItem value="Low" className="text-white hover:bg-slate-700">
                Low
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px] sm:w-[180px] bg-slate-800/50 border-slate-600/30 text-white backdrop-blur-sm">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-white hover:bg-slate-700">
                All Statuses
              </SelectItem>
              <SelectItem
                value="Open"
                className="text-white hover:bg-slate-700"
              >
                Open
              </SelectItem>
              <SelectItem
                value="In Progress"
                className="text-white hover:bg-slate-700"
              >
                In Progress
              </SelectItem>
              <SelectItem
                value="Resolved"
                className="text-white hover:bg-slate-700"
              >
                Resolved
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tickets List - Grouped by Status */}
      <div className="space-y-8">
        {filteredTickets.length === 0 ? (
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-slate-600/30 shadow-xl">
            <CardContent className="flex items-center justify-center py-8">
              <p className="text-slate-400">
                No tickets found matching your criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {groupedTickets.Open.length > 0 &&
              renderStatusSection("Open", groupedTickets.Open)}
            {groupedTickets["In Progress"].length > 0 &&
              renderStatusSection("In Progress", groupedTickets["In Progress"])}
            {groupedTickets.Resolved.length > 0 &&
              renderStatusSection("Resolved", groupedTickets.Resolved)}
          </>
        )}
      </div>

      {/* EditTicketDialog */}
      <EditTicketDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        ticket={editingTicket}
        onEditTicket={onEditTicket}
      />
    </div>
  );
}
