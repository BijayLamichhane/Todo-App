import type { Route } from "./+types/home";
import TasksCard from "~/components/TasksCard";
import NewTaskCard from "~/components/NewTaskCard";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App" },
    { name: "description", content: "Todo App - A simple todo app" },
  ];
}

export default function Home() {
  const { viewMode, tasks } = useAppContext() as AppContextType;

  // Filter out any null/undefined or incomplete tasks
  const safeTasks = Array.isArray(tasks)
    ? tasks.filter(
        (task): task is NonNullable<typeof task> =>
          Boolean(task && task._id && "isCompleted" in task)
      )
    : [];

  return (
    <>
      {safeTasks.length === 0 && <NewTaskCard />}

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {safeTasks.map((task) => (
          <TasksCard key={task._id} task={task} viewMode={viewMode} />
        ))}

        {safeTasks.length > 0 && <NewTaskCard />}
      </div>
    </>
  );
}
