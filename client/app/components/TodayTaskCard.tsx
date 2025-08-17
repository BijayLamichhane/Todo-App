import { useAppContext } from "~/context/useAppContext";
import type { AppContextType, Task } from "~/types";

export default function TodaysTasks() {
  const { tasks } = useAppContext() as AppContextType;


 const safeTasks = Array.isArray(tasks)
    ? tasks.filter((task): task is NonNullable<typeof task> =>
        Boolean(task && task._id && "isCompleted" in task && "date" in task)
      )
    : [];

  // Format today's date to match tasks' MM/DD/YYYY format
  const todayString = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const todaysTasks = safeTasks.filter((task) => task.date === todayString);

  return (
    <div className="mt-6 p-4 bg-white rounded-2xl shadow-md dark:bg-gray-700">
      <h2 className="text-lg font-semibold mb-3 dark:text-white/60">Today's Tasks</h2>

      {todaysTasks.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No tasks for today 🎉</p>
      ) : (
        <ul className="space-y-2">
          {todaysTasks.map((task) => (
            <li
              key={task._id}
              className="p-3 rounded-xl border flex justify-between items-center"
            >
              <div>
                <p className="font-medium dark:text-white/60">{task.title}</p>

                <p className="text-xs text-gray-500 dark:text-gray-400">{task.description}</p>
              </div>

              <span
                className={`px-2 py-1 text-xs rounded-lg ${
                  task.isCompleted
                    ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                    : "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                }`}
              >
                {task.isCompleted ? "Completed" : "Pending"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
