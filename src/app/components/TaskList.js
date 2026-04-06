import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="p-4 text-gray-400">No tasks yet!</p>;
  }

  return (
    <ul className="divide-y">
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