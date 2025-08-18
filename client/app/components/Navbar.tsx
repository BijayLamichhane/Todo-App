import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { NavigationDashbord } from "~/constants";
import AddTaskModal from "./AddTaskModal";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType } from "~/types";

const Navbar = () => {
  const { viewMode, setViewMode, tasks, setSortedTasks, searchQuery, setSearchQuery, sortBy, setSortBy } = useAppContext() as AppContextType;



  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = useLocation().pathname;

  const safeTasks = Array.isArray(tasks)
    ? tasks.filter((task): task is NonNullable<typeof task> =>
        Boolean(task && task._id && "isCompleted" in task && "date" in task)
      )
    : [];

  const todayString = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const isCompleted = safeTasks.filter((task) => task.isCompleted);
  const isIncompleted = safeTasks.filter((task) => !task.isCompleted);
  const isImportant = safeTasks.filter((task) => task.isImportant);


  const totalTasks = safeTasks.length;
  const totalCompletedTasks = isCompleted.length;
  const totalIncompletedTasks = isIncompleted.length;
  const totalImportantTasks = isImportant.length;
  const totalTodaysTasks = safeTasks.filter((task) => task.date === todayString).length;


  const taskMap: Record<string, typeof totalTasks> = {
  "/important-tasks": totalImportantTasks,
  "/completed-tasks": totalCompletedTasks,
  "/incomplete-tasks": totalIncompletedTasks,
  "/today-tasks": totalTodaysTasks,
};

const totalTasksLength = taskMap[pathname] ?? totalTasks;

  const currentDate = useMemo(
  () => new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  []
);

useEffect(() => {
    filterAndSortTasks();
  }, [tasks, searchQuery, sortBy]);

  const filterAndSortTasks = () => {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case "Date (newest)":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "Date (oldest)":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "Completed":
        filtered.sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted));
        break;
      case "Incomplete":
        filtered.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
        break;
      case "Important":
        filtered.sort((a, b) => Number(b.isImportant) - Number(a.isImportant));
        break;
      case "Default":
      default:
        // no sorting
        break;
    }

    setSortedTasks(filtered);
  }


  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search task"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-72 h-13 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-primary-100/30 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        {/* Date */}
        <div className="text-gray-500 dark:text-gray-300 text-xl">
          {currentDate}
        </div>

        {/* Notification & Add Task */}
        <div className="flex items-center gap-4">

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 dark:bg-primary-100 text-white rounded-lg px-6 py-3 hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
          >
            Add new task
          </button>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-2xl font-semibold text-gray-500 dark:text-gray-300">
            {NavigationDashbord.find((item) => item.href === pathname)?.label || ""}{" "}
            ({totalTasksLength} tasks)

          </h2>
          {pathname !== "/today-tasks" && <div className="flex items-center">

            <select className="border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-100/30" onChange={(e) => setSortBy(e.target.value)}>

              <option>Default</option>
              <option>Date (newest)</option>
              <option>Date (oldest)</option>
              {pathname !== "/completed-tasks" && pathname !== "/incomplete-tasks" && <option>Completed</option>}

              {pathname !== "/important-tasks" && <option>Important</option>}
              {pathname !== "/incomplete-tasks" && pathname !== "/completed-tasks" && <option>Incomplete</option>}



            </select>
          </div>}
        </div>

        {/* View Toggle */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
