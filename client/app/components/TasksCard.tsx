import type { Task } from "~/types";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";

const TasksCard = ({
  task,
  viewMode,
}: {
  task: Task;
  viewMode: "grid" | "list";
}) => {
  // Add safety check
  if (!task || typeof task !== 'object') {
    console.error('TasksCard received invalid task:', task);
    return null;
  }

  const { _id, title, description, date, isCompleted, isImportant } = task;
  
  // Add fallback values for safety
  const safeIsCompleted = isCompleted ?? false;
  const safeIsImportant = isImportant ?? false;
  
  const [isCompletedState, setIsCompletedState] = useState<boolean>(safeIsCompleted);
  const [isImportantState, setIsImportantState] = useState<boolean>(safeIsImportant);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCompleted = () => {
    setIsCompletedState(!isCompletedState);
  };

  const toggleImportant = () => {
    setIsImportantState(!isImportantState);
  };

  if (viewMode === "list") {
    return (
      <div className="flex items-center justify-between p-4 rounded-lg shadow bg-white dark:bg-gray-800 border">
        {/* Left section: Title + description */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {task.description}
          </p>
        </div>

        {/* Middle section: Date */}
        <div className="flex items-center mb-6 text-md text-gray-500 dark:text-gray-400">
          <svg
            className="mr-1"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          {date}
        </div>

        {/* Right section: Status badges + actions */}
        <div className="flex justify-between items-center gap-4">
          <span
            className={`text-xs px-3 py-2 rounded-full ${isCompletedState ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200" : "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"}`}
          >
            {isCompletedState ? "Completed" : "Uncompleted"}
          </span>
          {isImportantState && (
            <span
              className={`text-xs px-3 py-2 rounded-full bg-red-400 text-red-800 dark:bg-red-800 dark:text-red-200`}
            >
              Important
            </span>
          )}

          <div className="flex space-x-3 text-gray-500 dark:text-gray-400">
            <button className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
            <button className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleCompleted}>
                    {isCompletedState
                      ? "Mark as Uncompleted"
                      : "Mark as Completed"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleImportant}>
                    {isImportantState
                      ? "Mark as Unimportant"
                      : "Mark as Important"}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={_id}
      className="rounded-lg shadow-lg dark:shadow-gray-900/50 p-4 w-full h-58 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
    >
      {/* Task Content */}
      <h3 className="font-semibold text-2xl mb-2 text-gray-500 dark:text-gray-300">
        {title}
      </h3>
      <p className="mb-6 text-md text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {/* Date */}
      <div className="flex items-center mb-6 text-md text-gray-500 dark:text-gray-400">
        <svg
          className="mr-1"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        {date}
      </div>

      <Separator className="mb-6" />

      {/* Status and Actions */}
      <div className="flex justify-between items-center">
        <span
          className={`text-md px-4 py-2 rounded-full ${isCompletedState ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200" : "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"}`}
        >
          {isCompletedState ? "Completed" : "Uncompleted"}
        </span>
        {isImportantState && (
          <span
            className={`text-md px-4 py-2 rounded-full bg-red-400 text-red-800 dark:bg-red-800 dark:text-red-200`}
          >
            Important
          </span>
        )}

        <div className="flex space-x-3 text-gray-500 dark:text-gray-400">
          <button className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <button className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleCompleted}>
                  {isCompletedState
                    ? "Mark as Uncompleted"
                    : "Mark as Completed"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleImportant}>
                  {isImportantState
                    ? "Mark as Unimportant"
                    : "Mark as Important"}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={{
          _id,
          title,
          description,
          date,
          isCompleted: isCompletedState,
          isImportant: isImportantState,
        }}
        onSave={(updatedTask) => {
          // Local state update
          setIsCompletedState(updatedTask.isCompleted);
          setIsImportantState(updatedTask.isImportant);
          // Close modal
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default TasksCard;
