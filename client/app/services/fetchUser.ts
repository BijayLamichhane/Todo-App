import axios from "axios";
import { toast } from "sonner";

export const fetchUserData = async () => {
  try {
    const {data} = await axios.get('/api/user/data');

    return data.user;

  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'An error occurred');
    return null;
  }
}