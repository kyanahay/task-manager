import TaskBoard from './components/TaskBoard';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Task Manager</h1>
      <TaskBoard />
    </main>
  );
}