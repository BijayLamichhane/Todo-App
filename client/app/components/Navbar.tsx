import { useMemo, useState } from "react";
import { useLocation } from "react-router";
import { NavigationDashbord, tasks } from "~/constants";
import AddTaskModal from "./AddTaskModal";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType } from "~/types";

const Navbar = () => {
  const { viewMode, setViewMode } = useAppContext() as AppContextType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const currentDate = useMemo(
  () => new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  []
);

  const pathname = useLocation().pathname;

  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search task"
            value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
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
          <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </button>
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
            ({tasks.length} tasks)
          </h2>
          <div className="flex items-center">
            <select className="border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-100/30">
              <option>Sort by</option>
              <option>Date (newest)</option>
              <option>Date (oldest)</option>
              <option>Completed</option>
              <option>Important</option>
            </select>
          </div>
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
