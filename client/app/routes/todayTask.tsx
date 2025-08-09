import Dashboard1 from '~/components/Dashboard1';
import type { Route } from '../+types/root';
import TasksCard from '~/components/TasksCard';
import { tasks } from '~/constants';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Today Task" },
    { name: "description", content: "Todo App - Today Task" },
  ];
}

const TodayTask = () => {
  return (
    <>
      {tasks.filter((task) => task.date === new Date().toDateString()).map((task) => (
        <TasksCard key={task.id} task={task} />
      ))}
    </>
  )
}

export default TodayTask