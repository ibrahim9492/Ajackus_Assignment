import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

const Input = ({ className = "", ...props }) => {
  const { theme } = useTheme();

  return (
    <input
      className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base 
        shadow-sm transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        placeholder:italic placeholder:text-sm
        ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-400"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400"
        } ${className}`}
      {...props}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
