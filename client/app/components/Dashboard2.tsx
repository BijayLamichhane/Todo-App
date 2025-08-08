import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Separator } from "./ui/separator";
import { ProgressBar } from "./ProgressBar";

const Dashboard2 = () => {
  return (
    <div className="absolute right-0 top-0 bottom-0 h-full w-[325px] flex flex-col">
      <div className="flex items-center justify-center gap-4 p-8">
        <h1 className="font-semibold text-2xl">Hi, User!</h1>
        <img
          src="/dummy-avatar.jpg"
          alt="User"
          className="w-16 h-16 rounded-full"
        />
      </div>
      <div className="flex items-center space-x-2 justify-between pt-0 pb-0 p-4">
        <Label
          htmlFor="dark-mode"
          className="text-black/70 text-xl font-medium"
        >
          Dark Mode
        </Label>

        <Switch id="dark-mode" />
      </div>

      {/* Progress Bar Section */}
      <div className="px-4 py-6">
        <ProgressBar
          label="All tasks"
          completed={2}
          total={3}
          variant="default"
        />
      </div>

      <Separator className="my-4" />
      <div className="w-full h-full">
        <h2 className="px-4 text-gray-600">No tasks today</h2>
      </div>

      <div className="px-4 mt-4 text-red-500 cursor-pointer hover:text-red-600 text-center mb-8">
        Delete all data
      </div>
    </div>
  );
};

export default Dashboard2;
