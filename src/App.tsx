import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import TodoFilter from './components/TodoFilter';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: '업무' | '개인' | '쇼핑' | '기타';
  dueDate?: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | '업무' | '개인' | '쇼핑' | '기타'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTodo = (text: string, category: '업무' | '개인' | '쇼핑' | '기타', dueDate?: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: text.trim(),
          completed: false,
          category,
          dueDate
        }
      ]);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => {
      if (categoryFilter === 'all') return true;
      return todo.category === categoryFilter;
    });

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <button
            onClick={toggleDarkMode}
            className={`btn ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? '라이트 모드' : '다크 모드'}
          </button>
        </div>

        <TodoForm onSubmit={addTodo} darkMode={darkMode} />
        
        <div className="my-6">
          <TodoStats todos={todos} darkMode={darkMode} />
        </div>

        <div className="my-6">
          <TodoFilter
            filter={filter}
            categoryFilter={categoryFilter}
            onFilterChange={setFilter}
            onCategoryFilterChange={setCategoryFilter}
            darkMode={darkMode}
          />
        </div>

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default App;