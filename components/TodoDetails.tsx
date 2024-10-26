"use client";

import { Todo } from "@/types/todo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";

interface TodoDetailsProps {
  todo: Todo;
  open: boolean;
  onClose: () => void;
}

export function TodoDetails({ todo, open, onClose }: TodoDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{todo.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{todo.description}</p>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                todo.status === "COMPLETED"
                  ? "default"
                  : todo.status === "IN_PROGRESS"
                  ? "secondary"
                  : "outline"
              }
            >
              {todo.status.replace("_", " ")}
            </Badge>
            <Badge
              variant={
                todo.priority === "HIGH"
                  ? "destructive"
                  : todo.priority === "MEDIUM"
                  ? "secondary"
                  : "outline"
              }
            >
              {todo.priority}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="w-4 h-4" />
              <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon className="w-4 h-4" />
              <span>
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
