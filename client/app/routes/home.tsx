import type { Route } from "./+types/home";
import { tasks } from "~/constants";
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
  const { viewMode } = useAppContext() as AppContextType;
  console.log(viewMode);
  return (
    <>
    {tasks.length === 0 && <NewTaskCard />}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        {tasks.map((task) => (
          <TasksCard key={task._id} task={task} viewMode={viewMode} />
        ))}
        {tasks.length > 0 && <NewTaskCard />}
      </div>
    </>
  );
}
