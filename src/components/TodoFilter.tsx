import React from 'react';

interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';
  categoryFilter: 'all' | '업무' | '개인' | '쇼핑' | '기타';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  onCategoryFilterChange: (category: 'all' | '업무' | '개인' | '쇼핑' | '기타') => void;
  darkMode: boolean;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  categoryFilter,
  onFilterChange,
  onCategoryFilterChange,
  darkMode
}) => {
  return (
    <div className="flex space-x-4">
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as 'all' | 'active' | 'completed')}
        className={`input ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
      >
        <option value="all">모든 할 일</option>
        <option value="active">진행중</option>
        <option value="completed">완료됨</option>
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryFilterChange(e.target.value as 'all' | '업무' | '개인' | '쇼핑' | '기타')}
        className={`input ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
      >
        <option value="all">모든 카테고리</option>
        <option value="업무">업무</option>
        <option value="개인">개인</option>
        <option value="쇼핑">쇼핑</option>
        <option value="기타">기타</option>
      </select>
    </div>
  );
};

export default TodoFilter;