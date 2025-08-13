import type { Route } from "../+types/root";
import TasksCard from "~/components/TasksCard";
import { tasks } from "~/constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Important Task" },
    { name: "description", content: "Todo App - Important Task" },
  ];
}

const ImportantTask = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks
          .filter((task) => task.isImportant)
          .map((task) => (
            <TasksCard key={task._id} task={task} />
          ))}
      </div>
    </>
  );
};

export default ImportantTask;
