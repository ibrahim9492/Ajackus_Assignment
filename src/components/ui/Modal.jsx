import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useTheme } from "../../context/ThemeContext";

const Modal = ({ isOpen, onClose, children, title }) => {
  const { theme } = useTheme();

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6 bg-black/50 backdrop-blur-sm"
      onClick={onClose} // close on outside click
    >
      {/* Modal Box */}
      <div
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl transform transition-all animate-fade-in-up ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100 border border-gray-700"
            : "bg-white text-gray-900 border border-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-6 py-4 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
