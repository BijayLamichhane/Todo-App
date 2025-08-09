import { useState } from "react";
import { useLocation } from "react-router";
import { NavigationDashbord, tasks } from "~/constants";

const Navbar = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pathname = useLocation().pathname

  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search task"
            className="w-full md:w-72 h-13 bg-white rounded-lg border border-gray-200 px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-primary-100/30"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
        <div className="text-gray-500 text-xl">{currentDate}</div>

        {/* Notification & Add Task */}
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
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
          <button className="bg-purple-600 text-white rounded-lg px-6 py-3 hover:bg-purple-700 transition-colors">
            Add new task
          </button>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-2xl font-semibold text-gray-500">
            {NavigationDashbord.map((item) => (
              <span key={item.href}>
                {pathname === item.href ? item.label : ''}
              </span>
            ))} ({tasks.length} tasks)
          </h2>
          <div className="flex items-center">
            <select className="border rounded-lg px-4 py-3 text-gray-700 bg-white">
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
            className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-200" : ""}`}
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
            className={`p-2 rounded ${viewMode === "list" ? "bg-gray-200" : ""}`}
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
    </>
  );
};

export default Navbar;
