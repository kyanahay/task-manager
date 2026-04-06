'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim());
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 rounded border px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="rounded bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800"
      >
        Add
      </button>
    </form>
  );
}