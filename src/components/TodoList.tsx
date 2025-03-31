import React from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: '업무' | '개인' | '쇼핑' | '기타';
  dueDate?: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  darkMode: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, darkMode }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '업무':
        return 'bg-blue-100 text-blue-800';
      case '개인':
        return 'bg-green-100 text-green-800';
      case '쇼핑':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  };

  const isOverdue = (dateString?: string) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <ul className="space-y-3">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}
        >
          <div className="flex items-center space-x-4 flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className={`h-5 w-5 rounded border-gray-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`text-sm px-2 py-1 rounded ${getCategoryColor(todo.category)}`}>
                  {todo.category}
                </span>
                {todo.dueDate && (
                  <span className={`text-sm ${isOverdue(todo.dueDate) && !todo.completed ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatDate(todo.dueDate)}
                  </span>
                )}
              </div>
              <span className={`block mt-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
            </div>
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className={`ml-4 btn ${darkMode ? 'bg-red-900 hover:bg-red-800' : 'bg-red-100 hover:bg-red-200'} text-red-600`}
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;