import type { Route } from '../+types/root';
import TasksCard from '~/components/TasksCard';
import { tasks } from '~/constants';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Incompleted Task" },
    { name: "description", content: "Todo App - Incompleted Task" },
  ];
}

const IncompletedTask = () => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.filter((task) => !task.completed).map((task) => (
        <TasksCard key={task.id} {...task} />
      ))}
    </div>
    </>
  )
}

export default IncompletedTask