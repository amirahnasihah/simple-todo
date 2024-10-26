"use client";

import { useState, useMemo } from 'react';
import { Todo, TodoFilters } from '@/types/todo';
import { dummyTodos, ITEMS_PER_PAGE } from '@/lib/data';

export const useTodos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TodoFilters>({});

  const filteredTodos = useMemo(() => {
    return dummyTodos.filter((todo) => {
      const matchesStatus = !filters.status || todo.status === filters.status;
      const matchesPriority = !filters.priority || todo.priority === filters.priority;
      const matchesSearch = !filters.search || 
        todo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        todo.description.toLowerCase().includes(filters.search.toLowerCase());

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  
  const paginatedTodos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTodos.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTodos, currentPage]);

  return {
    todos: paginatedTodos,
    totalPages,
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    totalTodos: filteredTodos.length,
  };
};