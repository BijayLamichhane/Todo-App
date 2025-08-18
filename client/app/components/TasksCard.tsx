import type { AppContextType, Task } from "~/types";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { useAppContext } from "~/context/useAppContext";
import { toast } from "sonner";
import { fetchTaskData } from "~/services/fetchTask";

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
  const {axios, setTasks, tasks} = useAppContext() as AppContextType;
  
  // Add fallback values for safety
  const safeIsCompleted = isCompleted ?? false;
  const safeIsImportant = isImportant ?? false;
  
  const [isCompletedState, setIsCompletedState] = useState<boolean>(safeIsCompleted);
  const [isImportantState, setIsImportantState] = useState<boolean>(safeIsImportant);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCompleted = async () => {
    try {
      const {data} = await axios.post('/api/task/update', {
        id: _id,
        isCompleted: !isCompletedState,
      })
      if(data.success) {
        toast.success('Task completion status updated');
        setIsCompletedState(!isCompletedState);
      }
    } catch (error) {
      toast.error('Failed to update task completion status');

    }
  };

  const toggleImportant = async () => {
    try {
      const {data} = await axios.post('/api/task/update', {
        id: _id,
        isImportant: !isImportantState,
      })
      if(data.success) {
        toast.success('Task importance status updated');
        setIsImportantState(!isImportantState);
      }
    } catch (error) {
      toast.error('Failed to update task importance status');
    }
  };

  const deleteTask = async () => {
    try {
      const {data} = await axios.post('/api/task/delete', {
        id: _id,
      })
      if(data.success) {
        toast.success('Task deleted');
        // ✅ update context state so page rerenders
        setTasks(tasks.filter(task => task._id !== _id));
      }
    } catch (error) {
      toast.error('Failed to delete task');
    }
  }



  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg shadow bg-white dark:bg-gray-800 border gap-3 sm:gap-4">
        {/* Left section: Title + description */}
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold truncate">{task.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {task.description}
          </p>
        </div>

        {/* Middle section: Date - Hidden on small screens */}
        <div className="hidden sm:flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg className="mr-1 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <span className="whitespace-nowrap">{date}</span>
        </div>

        {/* Right section: Status badges + actions */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
              isCompletedState 
                ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200" 
                : "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
            }`}>
              {isCompletedState ? "Completed" : "Pending"}
            </span>
            {isImportantState && (
              <span className="text-xs px-2 py-1 rounded-full bg-red-400 text-red-800 dark:bg-red-800 dark:text-red-200 whitespace-nowrap">
                Important
              </span>
            )}
          </div>

          {/* Action buttons - Responsive sizing */}
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <button 
              onClick={toggleImportant}
              className="p-1 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
            <button 
              onClick={deleteTask}
              className="p-1 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                  <svg
                    width="14"
                    height="14"
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
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleCompleted}>
                    {isCompletedState ? "Mark as Pending" : "Mark as Completed"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleImportant}>
                    {isImportantState ? "Mark as Normal" : "Mark as Important"}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }

  // Grid view - Responsive card sizing
  return (
    <div className="rounded-lg shadow-lg dark:shadow-gray-900/50 p-4 sm:p-5 w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex flex-col">
      {/* Task Content */}
      <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-2 text-gray-500 dark:text-gray-300 line-clamp-2">
        {title}
      </h3>
      <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-3 flex-1">
        {description}
      </p>

      {/* Date */}
      <div className="flex items-center mb-4 sm:mb-6 text-sm sm:text-base text-gray-500 dark:text-gray-400">
        <svg className="mr-1 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        <span className="truncate">{date}</span>
      </div>

      <Separator className="mb-4 sm:mb-6" />

      {/* Status and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${
            isCompletedState 
              ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200" 
              : "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
          }`}>
            {isCompletedState ? "Completed" : "Pending"}
          </span>
          {isImportantState && (
            <span className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-red-400 text-red-800 dark:bg-red-800 dark:text-red-200">
              Important
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-gray-500 dark:text-gray-400">
          <button 
            onClick={toggleImportant}
            className="p-1.5 sm:p-2 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <button 
            onClick={deleteTask}
            className="p-1.5 sm:p-2 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 sm:p-2 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleCompleted}>
                  {isCompletedState ? "Mark as Pending" : "Mark as Completed"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleImportant}>
                  {isImportantState ? "Mark as Normal" : "Mark as Important"}
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
          setIsCompletedState(updatedTask.isCompleted);
          setIsImportantState(updatedTask.isImportant);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default TasksCard;
