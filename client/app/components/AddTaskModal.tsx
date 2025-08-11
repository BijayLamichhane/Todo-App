import React, { useState, useEffect, useRef } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    isImportant: false,
    isCompleted: false,
  });

  // Reset form data to initial state
  const resetFormData = () => {
    setFormData({
      title: "",
      date: "",
      description: "",
      isImportant: false,
      isCompleted: false,
    });
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
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

  // Handle modal visibility transitions and reset form when opening
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      resetFormData(); // Reset form data when modal opens
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    resetFormData(); // Reset form data after submission
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 backdrop-blur-sm"
          : "opacity-0 backdrop-blur-none"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          ref={modalRef}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Add a task
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                required
              />
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                  required
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="e.g, study for the test"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-colors"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isImportant}
                  onChange={(e) =>
                    handleInputChange("isImportant", e.target.checked)
                  }
                  className="w-4 h-4 text-primary-100 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-100/30 bg-white dark:bg-gray-700 transition-colors"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Mark as important
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCompleted}
                  onChange={(e) =>
                    handleInputChange("isCompleted", e.target.checked)
                  }
                  className="w-4 h-4 text-primary-100 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-100/30 bg-white dark:bg-gray-700 transition-colors"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Mark as completed
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-100 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-600 transition-colors duration-200"
            >
              Add a task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
