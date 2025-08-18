import { Link, useLocation } from "react-router";
import { NavigationDashbord } from "~/constants";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";

const Dashboard1 = () => {
  const pathname = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800">
        {/* Header - Responsive text sizing */}
        <h1 className="text-lg sm:text-xl lg:text-2xl text-black/70 dark:text-white/70 font-bold p-4 sm:p-6 lg:p-8 text-center lg:text-left">
          TO-DO LIST
        </h1>

        {/* Add Task Button - Responsive sizing */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-[90%] sm:w-[280px] mx-auto lg:ml-6 h-12 sm:h-[50px] lg:h-[60px] bg-primary-100 text-white rounded-xl mb-4 sm:mb-6 lg:mb-10 cursor-pointer hover:opacity-80 text-sm sm:text-base transition-all duration-200"
        >
          Add New Task
        </button>
        
        {/* Navigation Links - Responsive layout */}
        <div className="flex flex-col items-stretch">
          {NavigationDashbord.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`w-full h-12 sm:h-[50px] lg:h-[55px] text-gray-500 dark:text-gray-300 font-medium sm:font-semibold text-sm sm:text-lg lg:text-xl cursor-pointer hover:bg-red-200 dark:hover:bg-red-800/20 items-center flex px-4 sm:px-6 justify-center lg:justify-start transition-colors duration-200 ${
                pathname === item.href 
                  ? "bg-[#f0e3ff] dark:bg-purple-900/30 text-secondary-100 dark:text-purple-300 border-r-4 sm:border-r-6 border-secondary-10" 
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Dashboard1;
