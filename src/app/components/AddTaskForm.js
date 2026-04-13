// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE:  Collects a new task title from the user and
//           sends it upward to TaskBoard through onAdd.
// TYPE:     Client Component — uses useState and form events
// ══════════════════════════════════════════════════════


'use client';

import { useState } from 'react';

// Props:
//   onAdd — callback function from TaskBoard that receives
//           the new task title after validation
export default function AddTaskForm({ onAdd }) {
  // title belongs in local state because only this component
  // needs to track what the user is typing right now.
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    // preventDefault stops the browser's normal form submission,
    // which would reload the page and wipe React state.
    e.preventDefault();

    // trim() prevents blank tasks or tasks made only of spaces.
    if (!title.trim()) return;

    // The form does not own the full task list, so it sends
    // the validated title up to TaskBoard through a callback.
    onAdd(title.trim());

    // Resetting the input improves usability after submission.
    setTitle('');
  }

  return (
    // Using onSubmit means the form works for both the button
    // click and pressing Enter, which is better for accessibility.
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        // Controlled input: the value always comes from React state,
        // and onChange keeps the state updated on every keystroke.
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
