"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TodoDetails } from "@/components/TodoDetails";
import { TodoDialog } from "@/components/TodoDialog";
import {
  CalendarIcon,
  CheckCircle2Icon,
  CircleDotIcon,
  CircleIcon,
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
} from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  onAdd: (todo: Omit<Todo, "id" | "createdAt">) => void;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
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

export function TodoList({ todos, onAdd, onUpdate, onDelete }: TodoListProps) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  const handleDelete = () => {
    if (todoToDelete) {
      onDelete(todoToDelete);
      setTodoToDelete(null);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Button onClick={() => setIsAddOpen(true)} className="w-full sm:w-auto">
          <PlusCircleIcon className="w-4 h-4 mr-2" />
          Add New Todo
        </Button>
      </div>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No todos found matching your criteria
          </div>
        ) : (
          todos.map((todo) => {
            const StatusIcon = statusIcons[todo.status];
            return (
              <Card
                key={todo.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedTodo(todo);
                  setIsDetailsOpen(true);
                }}
              >
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
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTodo(todo);
                          setIsEditOpen(true);
                        }}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTodoToDelete(todo.id);
                          setIsDeleteOpen(true);
                        }}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {selectedTodo && (
        <>
          <TodoDetails
            todo={selectedTodo}
            open={isDetailsOpen}
            onClose={() => {
              setIsDetailsOpen(false);
              setSelectedTodo(null);
            }}
          />
          <TodoDialog
            todo={selectedTodo}
            open={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedTodo(null);
            }}
            onSubmit={(updatedTodo) =>
              onUpdate({
                ...updatedTodo,
                id: selectedTodo.id,
                createdAt: selectedTodo.createdAt,
              })
            }
          />
        </>
      )}

      <TodoDialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={onAdd}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              todo from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTodoToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
