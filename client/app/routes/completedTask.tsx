import type { Route } from '../+types/root';
import { tasks } from '~/constants';
import TasksCard from '~/components/TasksCard';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Completed Task" },

    { name: "description", content: "Todo App - Completed Task" },

  ];
}

const CompletedTask = () => {
  return (
    <div>
      {tasks.filter((task) => task.completed).map((task) => (
        <TasksCard key={task.id} task={task} />
      ))}

    </div>
  )
}

export default CompletedTask