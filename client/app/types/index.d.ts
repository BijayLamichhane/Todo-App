
export interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface NewTaskCardProps {
    onClick?: () => void;
}

export interface ProgressBarProps {
    label?: string;
    completed: number;
    total: number;
    className?: string;
    showRatio?: boolean;
    variant?: "default" | "success" | "warning" | "danger";
}
export interface User {
    _id: string;
    name: string;
    email: string;
}
  
export interface Task {
    _id: string;
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
    user?: string;
}

export interface AppContextType {
    // Core state
    token: string | null;
    user: User | null;
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    
    // Actions
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    setTasks: (tasks: Task[]) => void;
    logOut: () => void;
    fetchTasks: () => Promise<void>;
    fetchUser: () => Promise<void>;
    setIsLoading: (isLoading: boolean) => void;

    
    // Utilities
    navigate: any; // or proper type
    axios: any;    // or proper type
  }

