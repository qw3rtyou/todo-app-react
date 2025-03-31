import React, { useState } from 'react';

interface TodoFormProps {
  onSubmit: (text: string, category: '업무' | '개인' | '쇼핑' | '기타', dueDate?: string) => void;
  darkMode: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, darkMode }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'업무' | '개인' | '쇼핑' | '기타'>('업무');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text, category, dueDate || undefined);
    setText('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
          className={`input flex-1 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 placeholder-gray-400'}`}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as '업무' | '개인' | '쇼핑' | '기타')}
          className={`input w-32 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
        >
          <option value="업무">업무</option>
          <option value="개인">개인</option>
          <option value="쇼핑">쇼핑</option>
          <option value="기타">기타</option>
        </select>
      </div>
      
      <div className="flex space-x-4">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`input ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
        />
        <button
          type="submit"
          className={`btn ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
        >
          추가
        </button>
      </div>
    </form>
  );
};

export default TodoForm;