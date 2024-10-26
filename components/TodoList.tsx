"use client";

import { Todo } from "@/types/todo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  CheckCircle2Icon,
  CircleDotIcon,
  CircleIcon,
} from "lucide-react";

interface TodoListProps {
  todos: Todo[];
}

const statusIcons = {
  PENDING: CircleIcon,
  IN_PROGRESS: CircleDotIcon,
  COMPLETED: CheckCircle2Icon,
};

const priorityColors = {
  LOW: "bg-blue-100 text-blue-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-red-100 text-red-800",
};

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No todos found matching your criteria
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => {
        const StatusIcon = statusIcons[todo.status];
        return (
          <Card key={todo.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <StatusIcon className="w-5 h-5" />
                    {todo.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {todo.description}
                  </p>
                </div>
                <Badge className={priorityColors[todo.priority]}>
                  {todo.priority.toLowerCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="w-4 h-4" />
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
