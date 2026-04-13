// ══════════════════════════════════════════════════════
// COMPONENT: TaskStats
// PURPOSE:  Displays live task counts and provides a button
//           to clear all completed tasks at once.
// TYPE:     Client Component — uses onClick handler═══
// ══════════════════════════════════════════════════════

'use client';

// Props:
//   total            — total number of tasks
//   completed        — number of completed tasks
//   active           — number of incomplete tasks
//   onClearCompleted — callback that removes all done tasks
export default function TaskStats({
  total,
  completed,
  active,
  onClearCompleted,
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      {/* These values are derived in TaskBoard and passed down,
          which keeps TaskStats focused on display only. */}
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
