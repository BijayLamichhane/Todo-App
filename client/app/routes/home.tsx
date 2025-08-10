import type { Route } from "./+types/home";
import { tasks } from "~/constants";
import TasksCard from "~/components/TasksCard";
import NewTaskCard from "~/components/NewTaskCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App" },
    { name: "description", content: "Todo App - A simple todo app" },
  ];
}

export default function Home() {
  return (
    <>
    {tasks.length === 0 && <NewTaskCard />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TasksCard key={task.id} {...task} />
        ))}
        {tasks.length > 0 && <NewTaskCard />}
      </div>
    </>
  );
}
