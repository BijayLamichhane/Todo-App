import type { Route } from "../+types/root";
import { tasks } from "~/constants";
import TasksCard from "~/components/TasksCard";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Completed Task" },

    { name: "description", content: "Todo App - Completed Task" },
  ];
}

const CompletedTask = () => {
  const { viewMode } = useAppContext() as AppContextType;


  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
      {tasks
        .filter((task) => task.isCompleted)
        .map((task) => (
          <TasksCard key={task._id} task={task} viewMode={viewMode} />
        ))}
    </div>
  );
};

export default CompletedTask;
