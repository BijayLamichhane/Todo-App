import type { Route } from "../+types/root";
import TasksCard from "~/components/TasksCard";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Incompleted Task" },
    { name: "description", content: "Todo App - Incompleted Task" },
  ];
}

const IncompletedTask = () => {
  const { viewMode, sortedTasks } = useAppContext() as AppContextType;

  // Filter out any null/undefined or incomplete tasks
  const safeTasks = Array.isArray(sortedTasks)
    ? sortedTasks.filter((task): task is NonNullable<typeof task> =>
        Boolean(task && task._id && "isCompleted" in task)
      )
    : [];

  return (
    <>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
            : "flex flex-col gap-3 sm:gap-4"
        }
      >
        {safeTasks
          .filter((task) => !task.isCompleted)
          .map((task) => (
            <TasksCard key={task._id} task={task} viewMode={viewMode} />
          ))}
      </div>
    </>
  );
};

export default IncompletedTask;
