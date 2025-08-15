import axios from "axios";
import { toast } from "sonner";

export const fetchTaskData = async () => {
  try {
    const { data } = await axios.get('/api/task/get');
    
    // Validate the response structure
    if (!data || !Array.isArray(data.tasks)) {
      console.error('Invalid API response:', data);
      return [];
    }
    
    // Filter out invalid tasks
    const validTasks = data.tasks.filter((task: any) => 
      task && 
      typeof task === 'object' && 
      task._id && 
      task.title && 
      typeof task.isCompleted === 'boolean' &&
      typeof task.isImportant === 'boolean'
    );
    
    return validTasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    toast.error(error instanceof Error ? error.message : 'An error occurred');
    return [];
  }
}