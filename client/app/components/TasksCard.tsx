import { tasks as allTasks } from '~/constants'
import NewTaskCard from './NewTaskCard'
import { Separator } from './ui/separator'

const TasksCard = ({ task }: TaskProps) => {
  // If a single task is provided, render just that task
  if (task) {
    return (
      <div
        key={task.id}
        className="rounded-lg shadow-sm p-4 w-full h-58"
      >
        {/* Task Content */}
        <h3 className="font-semibold text-2xl mb-2 text-gray-500">
          {task.title}
        </h3>
        <p className="mb-6 text-md text-gray-600">
          {task.description}
        </p>

        {/* Date */}
        <div className="flex items-center mb-6 text-md text-gray-500">
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
          {task.date}
        </div>

        <Separator className='mb-6' />

        {/* Status and Actions */}
        <div className="flex justify-between items-center">
          <span
            className={`text-md px-4 py-2 rounded-full ${task.completed ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}
          >
            {task.completed ? "Completed" : "Uncompleted"}
          </span>

          <div className="flex space-x-3 text-gray-500">
            <button>
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
            <button >
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
            <button>
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
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the grid of all tasks
  return (
    <>
      {allTasks.length === 0 && <NewTaskCard />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Task Cards */}
        {allTasks.map((task) => (
          <div
            key={task.id}
            className="rounded-lg shadow-sm p-4 w-full h-58"
          >
            {/* Task Content */}
            <h3 className="font-semibold text-2xl mb-2 text-gray-500">
              {task.title}
            </h3>
            <p className="mb-6 text-md text-gray-600">
              {task.description}
            </p>

            {/* Date */}
            <div className="flex items-center mb-6 text-md text-gray-500">
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
              {task.date}
            </div>

            <Separator className='mb-6' />

            {/* Status and Actions */}
            <div className="flex justify-between items-center">
              <span
                className={`text-md px-4 py-2 rounded-full ${task.completed ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}
              >
                {task.completed ? "Completed" : "Uncompleted"}
              </span>

              <div className="flex space-x-3 text-gray-500">
                <button>
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
                <button >
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
                <button>
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
              </div>
            </div>
          </div>
        ))}

        {/* Add New Task Card */}
        {allTasks.length > 0 && <NewTaskCard />}
      </div>
    </>
  )
}

export default TasksCard