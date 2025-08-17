import axios from 'axios';
import { AppContext } from './ContextDefination';
import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { fetchTaskData } from '~/services/fetchTask';
import { fetchUserData } from '~/services/fetchUser';
import type { Task, User } from '~/types';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const user = await fetchUserData();
      setUser(user || null);
    } catch {
      setError('Failed to fetch user');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tasks = await fetchTaskData();
      setTasks(tasks || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch tasks';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const validateToken = async (): Promise<boolean> => {
    try {
      await fetchUserData();
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      return true; // Other errors shouldn't log out the user
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Validate token first, then fetch data
      validateToken().then(isValid => {
        if (isValid) {
          fetchUser();
          fetchTasks();
        } else {
          logOut(); // Token expired
        }
      });
    }
  }, [token]);



  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const value = {
    navigate,
    axios,
    user,
    setUser,
    tasks,
    setTasks,
    logOut,
    fetchTasks,
    fetchUser,
    token,
    setToken,
    isLoading,
    setIsLoading,
    error,
    setError,
    viewMode,
    setViewMode,

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
