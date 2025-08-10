import type { Route } from "../+types/root";
import TasksCard from "~/components/TasksCard";
import { tasks } from "~/constants";
import NewTaskCard from "~/components/NewTaskCard";
import { useState } from "react";
import AddTaskModal from "~/components/AddTaskModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Today Task" },
    { name: "description", content: "Todo App - Today Task" },
  ];
}

const TodayTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format today's date to match tasks' MM/DD/YYYY format
  const todayString = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const todaysTasks = tasks.filter((task) => task.date === todayString);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todaysTasks.map((task) => (
          <TasksCard key={task.id} {...task} />
        ))}
        {todaysTasks.length === 0 && (
          <NewTaskCard onClick={() => setIsModalOpen(true)} />
        )}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TodayTask;
