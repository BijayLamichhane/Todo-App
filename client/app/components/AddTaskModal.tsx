import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAppContext } from "~/context/useAppContext";
import type { AppContextType, Task } from "~/types";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Task;
  onSave?: (updatedTask: Task) => void; // new callback for edit
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { axios, isLoading, setIsLoading } = useAppContext() as AppContextType;

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    isImportant: false,
    isCompleted: false,
  });

  // Reset form data
  const resetFormData = () => {
    setFormData({
      title: "",
      date: "",
      description: "",
      isImportant: false,
      isCompleted: false,
    });
  };

  // Pre-fill form if editing
  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    if (initialData && typeof initialData === "object") {
      setFormData({
        title: initialData.title ?? "",
        date: initialData.date ?? "",
        description: initialData.description ?? "",
        isImportant: initialData.isImportant ?? false,
        isCompleted: initialData.isCompleted ?? false,
      });
    } else {
      resetFormData();
    }
  }, [isOpen, initialData]);

  // Escape key close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Click outside close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      if (initialData) {
        // Edit task
        response = await axios.post(`/api/task/update`, {
          id: initialData._id,
          ...formData,
        });
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Add new task
        response = await axios.post("/api/task/add", formData);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        if (onSave) onSave(response.data.task);
        resetFormData();
        onClose();
        window.location.reload();

      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="flex items-center justify-center min-h-screen p-3 sm:p-4 w-full">
        <div
          ref={modalRef}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg transform transition-all duration-300 ease-in-out max-h-[90vh] overflow-y-auto ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Title Bar - Responsive padding */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              {initialData ? "Edit Task" : "Add a task"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Form - Responsive spacing */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g, study for the test"
                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                required
              />
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                placeholder="mm/dd/yyyy"
                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="e.g, study for the test"
                rows={3}
                maxLength={30}
                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none text-sm sm:text-base"
              />
            </div>

            {/* Checkboxes - Responsive layout */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isImportant}
                  onChange={(e) => handleInputChange("isImportant", e.target.checked)}
                  className="w-4 h-4 text-primary-100 border-gray-300 dark:border-gray-600 rounded"
                />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Mark as important
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCompleted}
                  onChange={(e) => handleInputChange("isCompleted", e.target.checked)}
                  className="w-4 h-4 text-primary-100 border-gray-300 dark:border-gray-600 rounded"
                />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Mark as completed
                </span>
              </label>
            </div>

            {/* Submit Button - Responsive sizing */}
            <button
              type="submit"
              className="w-full bg-primary-100 text-white py-3 sm:py-3.5 px-6 rounded-lg font-medium hover:bg-purple-600 transition-colors text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading
                ? initialData
                  ? "Saving..."
                  : "Adding..."
                : initialData
                  ? "Save Changes"
                  : "Add Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
