import type { Route } from "../+types/root";
import TasksCard from "~/components/TasksCard";
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
  const { viewMode, sortedTasks } = useAppContext() as AppContextType;

  // Ensure tasks array is valid and filter out null/undefined entries
  const safeTasks = Array.isArray(sortedTasks)
    ? sortedTasks.filter((task): task is NonNullable<typeof task> =>
        Boolean(task && task._id && "isCompleted" in task && "date" in task)
      )
    : [];

  // Format today's date to match tasks' MM/DD/YYYY format
  const todayString = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  // Only include tasks with today's date
  const todaysTasks = safeTasks.filter((task) => task.date === todayString);

  return (
    <>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
            : "flex flex-col gap-3 sm:gap-4"
        }
      >
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
