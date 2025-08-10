import React from "react";



const NewTaskCard: React.FC<NewTaskCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 h-[233px] bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 transition-colors"
    >
      <div className="flex flex-col items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-2"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <span>Add new task</span>
      </div>
    </div>
  );
};

export default NewTaskCard;
