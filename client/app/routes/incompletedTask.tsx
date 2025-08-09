import Dashboard1 from '~/components/Dashboard1';
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
      {tasks.filter((task) => !task.completed).map((task) => (
        <TasksCard key={task.id} task={task} />
      ))}
    </>
  )
}

export default IncompletedTask