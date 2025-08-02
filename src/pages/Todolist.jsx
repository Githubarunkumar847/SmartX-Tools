import { useState } from 'react';

const TodoTool = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTodos([...todos, { text: task.trim(), completed: false }]);
      setTask('');
    }
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTask = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const clearInput = () => setTask('');

  return (
    <div className="max-w-md mx-auto rounded-xl shadow-lg p-6 transition-all bg-white dark:bg-zinc-800">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
        📝 To-Do List
      </h2>

      {/* Task Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter a task..."
          className="flex-grow px-3 py-2 rounded border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          title="Add task"
        >
          Add
        </button>
        <button
          onClick={clearInput}
          className="bg-gray-300 dark:bg-zinc-600 hover:bg-gray-400 dark:hover:bg-zinc-500 text-black dark:text-white px-2 py-2 rounded"
          title="Clear input"
        >
          ❌
        </button>
      </div>

      {/* Task Count */}
      {todos.length > 0 && (
        <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
          You have {todos.filter(t => !t.completed).length} pending / {todos.length} total tasks
        </div>
      )}

      {/* Task List */}
      <ul className="space-y-3">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex items-start justify-between p-3 rounded-md transition-all duration-200 flex-wrap ${
              todo.completed
                ? 'bg-green-100 dark:bg-green-900'
                : 'bg-gray-100 dark:bg-zinc-700'
            }`}
          >
            <span
              onClick={() => toggleComplete(index)}
              className={`flex-1 cursor-pointer select-none break-words overflow-hidden pr-2 ${
                todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-black dark:text-white'
              }`}
              title="Click to mark as done/undone"
            >
              {todo.text}
            </span>
            <div className="flex gap-2 flex-shrink-0 mt-2 sm:mt-0">
              <button
                onClick={() => toggleComplete(index)}
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                title="Toggle complete"
              >
                ✔️
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Empty Message */}
      {todos.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No tasks added yet. Start writing above!
        </p>
      )}
    </div>
  );
};

export default TodoTool;
