import React from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: '업무' | '개인' | '쇼핑' | '기타';
  dueDate?: string;
}

interface TodoStatsProps {
  todos: Todo[];
  darkMode: boolean;
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos, darkMode }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const completionRate = totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100;

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">진행 상황</h2>
          <p className="text-sm text-gray-500">
            총 {totalTodos}개 중 {completedTodos}개 완료
          </p>
        </div>
        <div className="text-2xl font-bold">
          {completionRate.toFixed(0)}%
        </div>
      </div>
      
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </div>
  );
};

export default TodoStats;