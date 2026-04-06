'use client';

export default function TaskCard({ title, done, id, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between border-b p-3">
      <span className={done ? 'text-gray-400 line-through' : 'text-gray-900'}>
        {title}
      </span>

      <div className="flex gap-3">
        <button
          onClick={() => onToggle(id)}
          className="text-sm text-green-700 hover:underline"
        >
          Toggle
        </button>
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