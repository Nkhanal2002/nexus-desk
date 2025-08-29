"use client";

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

interface CreateTicketDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTicket: (formData: FormData) => void;
}

export function CreateTicketDialog({
  isOpen,
  onOpenChange,
  onCreateTicket,
}: CreateTicketDialogProps) {
  const handleSubmit = (formData: FormData) => {
    onCreateTicket(formData);
    toast.success("Ticket created successfully!", {
      description: "Your support ticket has been submitted and assigned an ID.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-600 mx-4">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Ticket</DialogTitle>
          <DialogDescription className="text-slate-300">
            Fill out the form below to create a new support ticket.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-200">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Brief description of the issue"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-200">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detailed description of the issue"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requester" className="text-slate-200">
              Requester Email
            </Label>
            <Input
              id="requester"
              name="requester"
              type="email"
              placeholder="user@company.com"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-slate-200">
              Priority
            </Label>
            <Select name="priority" required>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select priority" />
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
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Create Ticket
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
