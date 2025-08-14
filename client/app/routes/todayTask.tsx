import type { Route } from "../+types/root";
import TasksCard from "~/components/TasksCard";
import { tasks } from "~/constants";
import NewTaskCard from "~/components/NewTaskCard";
import { useState } from "react";
import AddTaskModal from "~/components/AddTaskModal";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Today Task" },
    { name: "description", content: "Todo App - Today Task" },
  ];
}

const TodayTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { viewMode } = useAppContext() as AppContextType;
  
  // Use context tasks instead of static tasks
  const tasksToUse = tasks.length > 0 ? tasks : [];

  // Format today's date to match tasks' MM/DD/YYYY format
  const todayString = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const todaysTasks = tasksToUse.filter((task) => task.date === todayString);

  return (
    <>
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        {todaysTasks.map((task) => (
          <TasksCard key={task._id} task={task} viewMode={viewMode} />

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
