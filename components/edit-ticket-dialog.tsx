"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

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

interface EditTicketDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket | null;
  onEditTicket: (ticketId: string, updatedData: Partial<Ticket>) => void;
}

export function EditTicketDialog({
  isOpen,
  onOpenChange,
  ticket,
  onEditTicket,
}: EditTicketDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requester: "",
    priority: "Medium" as "High" | "Medium" | "Low",
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        requester: ticket.requester,
        priority: ticket.priority,
      });
    }
  }, [ticket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket) return;

    onEditTicket(ticket.id, formData);
    toast.success("Ticket updated successfully!", {
      description: "The ticket information has been updated.",
    });
    onOpenChange(false);
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-600 mx-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Ticket</DialogTitle>
          <DialogDescription className="text-slate-300">
            Update the ticket information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-slate-200">
              Title
            </Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Brief description of the issue"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-slate-200">
              Description
            </Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed description of the issue"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-requester" className="text-slate-200">
              Requester Email
            </Label>
            <Input
              id="edit-requester"
              type="email"
              value={formData.requester}
              onChange={(e) =>
                setFormData({ ...formData, requester: e.target.value })
              }
              placeholder="user@company.com"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-priority" className="text-slate-200">
              Priority
            </Label>
            <Select
              value={formData.priority}
              onValueChange={(value: "High" | "Medium" | "Low") =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem
                  value="High"
                  className="text-white hover:bg-slate-600"
                >
                  High
                </SelectItem>
                <SelectItem
                  value="Medium"
                  className="text-white hover:bg-slate-600"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="Low"
                  className="text-white hover:bg-slate-600"
                >
                  Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-slate-600 text-slate-200 bg-slate-600 hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              Update Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
