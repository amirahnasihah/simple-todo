export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TodoPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  dueDate: string;
  createdAt: string;
}

export interface TodoFilters {
  status?: TodoStatus;
  priority?: TodoPriority;
  search?: string;
}