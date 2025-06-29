import type { TodoItem } from '../types';

const TODO_STORAGE_KEY = 'streak-tracker-todos';

export const loadTodos = (): TodoItem[] => {
    try {
        const data = localStorage.getItem(TODO_STORAGE_KEY);
        if (!data) return [];
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading todos from localStorage:', error);
        return [];
    }
};

export const saveTodos = (todos: TodoItem[]): void => {
    try {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.error('Error saving todos to localStorage:', error);
    }
};
