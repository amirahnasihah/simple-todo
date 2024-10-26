"use client";

import { TodoList } from "@/components/TodoList";
import { TodoFilters } from "@/components/TodoFilters";
import { Pagination } from "@/components/Pagination";
import { useTodos } from "@/hooks/useTodos";
import { ClipboardListIcon } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  const {
    todos,
    totalPages,
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    totalTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ClipboardListIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">
            Lepasni nak buat apa?
          </h1>
        </div>

        <TodoFilters filters={filters} onFilterChange={setFilters} />

        <TodoList
          todos={todos}
          onAdd={addTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalTodos}
        />
      </div>

      <Footer />
    </main>
  );
}
