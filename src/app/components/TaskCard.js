// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE:  Displays one task row and sends user actions
//           back up to TaskBoard through callback props.
// TYPE:     Client Component — uses onClick handlers
// ══════════════════════════════════════════════════════


'use client';

// Props:
//   id       — unique identifier for the current task
//   title    — text the user entered for the task
//   done     — boolean that decides whether the task is complete
//   onToggle — callback from TaskBoard to flip done status
//   onDelete — callback from TaskBoard to remove the task
export default function TaskCard({ title, done, id, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between border-b p-3">
      {/* The text style changes based on done so the user gets
          immediate visual feedback about completion status. */}
      <span className={done ? 'text-gray-400 line-through' : 'text-white'}> 
        {title}
      </span>

      <div className="flex gap-3">
        {/* This button does not update state here.
            It calls back up to TaskBoard, which owns the data. */}
        <button
          onClick={() => onToggle(id)}
          className="text-sm text-green-700 hover:underline"
        >
          Toggle
        </button>

        {/* Delete also flows upward because TaskBoard is the
            single source of truth for the task array. */}
        <button
          onClick={() => onDelete(id)}
          className="text-sm text-red-700 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
