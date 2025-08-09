import type { Route } from "../+types/root";
import { tasks } from "~/constants";
import TasksCard from "~/components/TasksCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Completed Task" },

    { name: "description", content: "Todo App - Completed Task" },
  ];
}

const CompletedTask = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks
        .filter((task) => task.completed)
        .map((task) => (
          <TasksCard key={task.id} {...task} />
        ))}
    </div>
  );
};

export default CompletedTask;
