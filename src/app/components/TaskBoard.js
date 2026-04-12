// COMPONENT: TaskBoard
// PURPOSE:  Stores all task data and controls the main
//           app logic. This component owns the task list,
//           filter state, and persistence logic.
// TYPE:     Client Component — uses useState + useEffect


'use client';

import { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

const defaultTasks = [
  { id: 't1', title: 'Buy milk', done: false },
  { id: 't2', title: 'Write tests', done: false },
  { id: 't3', title: 'Ship it', done: true },
];

export default function TaskBoard() {
  // tasks must live in state because the user can add, toggle,
  // delete, and clear items. React re-renders when this changes.
  const [tasks, setTasks] = useState(defaultTasks);

  // filter is separate state because it changes independently
  // from the tasks array and controls which subset is shown.
  const [filter, setFilter] = useState('all');

  // isLoaded prevents writing default tasks to localStorage
  // before we finish reading any previously saved tasks.
  const [isLoaded, setIsLoaded] = useState(false);

  // This effect reads from localStorage after the first client render.
  // We do this in useEffect instead of useState initialization to avoid
  // hydration mismatch between server HTML and client HTML.
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    setIsLoaded(true);
  }, []);

  // This effect syncs React state to localStorage whenever tasks change.
  // The dependency array includes tasks and isLoaded so it only writes
  // after saved data has been loaded.
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  // Callback passed down to AddTaskForm.
  // TaskBoard owns the task array, so the child must send the new title
  // upward instead of editing the list directly.
  function handleAdd(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      done: false,
    };

    // Spread creates a new array reference.
    // We do not mutate tasks directly because React relies on immutable
    // updates to detect changes and re-render correctly.
    setTasks([...tasks, newTask]);
  }

  // map() returns a new array where only the matching task is updated.
  // This is the correct immutable pattern for updating one item.
  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  // filter() returns a new array without the selected task.
  // This removes one item immutably instead of mutating the original array.
  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // This removes every completed task at once.
  // Again, filter() creates a new array rather than changing the old one.
  function handleClearCompleted() {
    setTasks(tasks.filter((task) => !task.done));
  }

  // Derived value: completedCount is calculated from tasks on each render.
  // We intentionally do not store this in state because that would duplicate
  // data and risk bugs if the values get out of sync.
  const completedCount = tasks.filter((task) => task.done).length;

  // Derived value: visibleTasks depends on the current filter and tasks.
  // This should be computed, not stored separately in state.
  const visibleTasks =
    filter === 'all'
      ? tasks
      : filter === 'done'
      ? tasks.filter((task) => task.done)
      : tasks.filter((task) => !task.done);

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg bg-gray-900 p-6 text-white">
     <TaskStats
  total={tasks.length}
  completed={completedCount}
  active={tasks.length - completedCount}
  onClearCompleted={handleClearCompleted}
/>

      <AddTaskForm onAdd={handleAdd} />

      <div className="mb-4 flex gap-2">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded px-3 py-1 text-sm ${
              filter === f
                ? 'bg-green-600 text-white'
                : 'border border-gray-600 text-gray-200'
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
