'use client';

import { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

const defaultTasks = [
  { id: 't1', title: 'Buy milk', done: false },
  { id: 't2', title: 'Write tests', done: false },
  { id: 't3', title: 'Ship it', done: true },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [filter, setFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  function handleAdd(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleClearCompleted() {
    setTasks(tasks.filter((task) => !task.done));
  }

  const completedCount = tasks.filter((task) => task.done).length;

  const visibleTasks =
    filter === 'all'
      ? tasks
      : filter === 'done'
      ? tasks.filter((task) => task.done)
      : tasks.filter((task) => !task.done);

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {completedCount} of {tasks.length} complete
        </p>

        <button
          onClick={handleClearCompleted}
          className="text-sm text-red-600 hover:underline"
        >
          Clear completed
        </button>
      </div>

      <AddTaskForm onAdd={handleAdd} />

      <div className="mb-4 flex gap-2">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded px-3 py-1 text-sm ${
              filter === f ? 'bg-green-700 text-white' : 'border'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}