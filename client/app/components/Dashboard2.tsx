import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Separator } from "./ui/separator";
import { ProgressBar } from "./ProgressBar";
import { useDarkMode } from "~/lib/darkModeContext";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType } from "~/types";

const Dashboard2 = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user } = useAppContext() as AppContextType;


  return (
    <div className="h-full w-full flex flex-col bg-white dark:bg-gray-800">
      <div className="flex items-center justify-center gap-4 p-6 lg:p-8">
        <h1 className="font-semibold text-xl lg:text-2xl text-gray-800 dark:text-white">
          Hi, {user?.name || "User"}!
        </h1>
        <img
          src="/dummy-avatar.jpg"
          alt="User"
          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
        />
      </div>
      <div className="flex items-center space-x-2 justify-between pt-0 pb-0 p-4">
        <Label
          htmlFor="dark-mode"
          className="text-black/70 dark:text-white/70 text-lg lg:text-xl font-medium"
        >
          Dark Mode
        </Label>

        <Switch
          id="dark-mode"
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
        />
      </div>

      {/* Progress Bar Section */}
      <div className="px-4 py-4 lg:py-6">
        <ProgressBar
          label="All tasks"
          completed={1}
          total={2}
          variant="default"
        />
      </div>

      <Separator className="my-4" />
      <div className="w-full h-full">
        <h2 className="px-4 text-gray-600 dark:text-gray-300 text-center lg:text-left">
          No tasks today
        </h2>
      </div>

      <div className="px-4 mt-4 text-red-500 dark:text-red-400 cursor-pointer hover:text-red-600 dark:hover:text-red-300 text-center mb-6 lg:mb-8">
        Delete all data
      </div>
    </div>
  );
};

export default Dashboard2;
