// ═══════════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE:  Renders the current visible task list and passes
//           task data down to TaskCard one item at a time.
// TYPE:     Client/Presentational Component — receives data
//           and callbacks through props
// ═══════════════════════════════════════════════════════════

import TaskCard from './TaskCard';

// Props:
//   tasks    — array of task objects to display
//   onToggle — callback passed through to each TaskCard
//   onDelete — callback passed through to each TaskCard
export default function TaskList({ tasks, onToggle, onDelete }) {
  // Conditional render: when there are no tasks to show,
  // display an empty-state message instead of an empty list.
  if (tasks.length === 0) {
    return <p className="p-4 text-gray-400">No tasks yet!</p>;
  }

  return (
    <ul className="divide-y">
      {/* map() turns the tasks array into JSX elements.
          key helps React track each item efficiently between renders. */}
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
