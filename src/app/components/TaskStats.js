// COMPONENT: TaskStats
// PURPOSE:  Displays live task counts and provides a button
//           to clear all completed tasks at once.
// TYPE:     Client Component — uses onClick handler


'use client';

export default function TaskStats({
  total,
  completed,
  active,
  onClearCompleted,
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-sm text-gray-300">
        {completed} of {total} complete ({active} active)
      </p>

      <button
        onClick={onClearCompleted}
        className="text-sm text-red-400 hover:underline"
      >
        Clear completed
      </button>
    </div>
  );
}
