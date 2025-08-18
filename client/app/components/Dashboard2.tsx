import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Separator } from "./ui/separator";
import { ProgressBar } from "./ProgressBar";
import { useDarkMode } from "~/lib/darkModeContext";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType } from "~/types";
import TodaysTasks from "./TodayTaskCard";

const Dashboard2 = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, tasks } = useAppContext() as AppContextType;

  const taskCount = tasks?.length || 0;
  const completedTaskCount =
    tasks?.filter((task) => task.isCompleted).length || 0;

  return (
    <div className="h-full w-full flex flex-col bg-white dark:bg-gray-800">
      {/* User Greeting - Responsive layout */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8">
        <h1 className="font-medium sm:font-semibold text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-white text-center sm:text-left">
          Hi, {user?.name || "User"}!
        </h1>
        <img
          src="/dummy-avatar.jpg"
          alt="User"
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full flex-shrink-0"
        />
      </div>
      
      {/* Dark Mode Toggle - Responsive spacing */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2">
        <Label
          htmlFor="dark-mode"
          className="text-black/70 dark:text-white/70 text-base sm:text-lg lg:text-xl font-medium"
        >
          Dark Mode
        </Label>
        <Switch
          id="dark-mode"
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
        />
      </div>

      {/* Progress Bar Section - Responsive padding */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 lg:py-6">
        <ProgressBar
          label="All tasks"
          completed={completedTaskCount}
          total={taskCount}
          variant="default"
        />
      </div>

      <Separator className="my-3 sm:my-4" />
      
      {/* Today's Tasks Section */}
      <div className="flex-1 px-4 sm:px-6">
        <h2 className="text-gray-600 dark:text-gray-300 text-center lg:text-left mb-4">
          <TodaysTasks />
        </h2>
      </div>
    </div>
  );
};

export default Dashboard2;
