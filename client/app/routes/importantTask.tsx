import type { Route } from "../+types/root";
import TasksCard from "~/components/TasksCard";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Important Task" },
    { name: "description", content: "Todo App - Important Task" },
  ];
}


const ImportantTask = () => {
  const { viewMode, sortedTasks } = useAppContext() as AppContextType;

  // Filter out any null/undefined or incomplete tasks
  const safeTasks = Array.isArray(sortedTasks)
    ? sortedTasks.filter(
        (task): task is NonNullable<typeof task> =>
          Boolean(task && task._id && "isCompleted" in task)
      )
    : [];
  return (
    <>
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        {safeTasks
          .filter((task) => task.isImportant)
          .map((task) => (
            <TasksCard key={task._id} task={task} viewMode={viewMode} />
          ))}
      </div>
    </>
  );
};

export default ImportantTask;
