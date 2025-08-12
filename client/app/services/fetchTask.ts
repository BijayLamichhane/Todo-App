import axios from "axios";
import { toast } from "sonner";

export const fetchTaskData = async () => {
    try {
      const {data} = await axios.get('/api/task/get');

      return data.tasks;

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
      return []
    }
  }