interface TaskProps {
    id: number;
    title: string;
    description: string;
    date: string;
    completed?: boolean;
    important?: boolean;
}

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface NewTaskCardProps {
    onClick?: () => void;
}

interface ProgressBarProps {
    label?: string;
    completed: number;
    total: number;
    className?: string;
    showRatio?: boolean;
    variant?: "default" | "success" | "warning" | "danger";
}