import { Link, useLocation } from "react-router";
import { NavigationDashbord } from "~/constants";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";

const Dashboard1 = () => {
  const pathname = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full lg:w-[325px] h-full flex flex-col bg-white dark:bg-gray-800">
        <h1 className="text-xl lg:text-2xl text-black/70 dark:text-white/70 font-bold p-8 lg:p-15 lg:pl-18 lg:pb-10 lg:ml-6 text-center lg:text-left">
          TO-DO LIST
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-[280px] mx-auto lg:ml-6 h-[50px] lg:h-[60px] bg-primary-100 text-white rounded-xl mb-6 lg:mb-10 cursor-pointer hover:opacity-80"
        >
          Add New Task
        </button>
        <div className="flex flex-col items-start justify-start">
          {NavigationDashbord.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`w-full h-[50px] lg:h-[55px] text-gray-500 dark:text-gray-300 font-semibold text-lg lg:text-xl cursor-pointer hover:bg-red-200 dark:hover:bg-red-800/20 items-center flex p-4 lg:p-6 justify-center lg:justify-start ${pathname === item.href ? "bg-[#f0e3ff] dark:bg-purple-900/30 text-secondary-100 dark:text-purple-300 border-r-6 border-secondary-10" : ""}`}
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
