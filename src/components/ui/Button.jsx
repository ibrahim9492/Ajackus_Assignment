import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const { theme } = useTheme();

  // 🔹 Base Styling
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-300 ease-in-out
    active:scale-95 shadow-md
  `;

  // 🔹 Size Variants
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // 🔹 Color Variants (Light/Dark Mode aware)
  const variantClasses = {
    primary:
      theme === "dark"
        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-400"
        : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500",
    secondary:
      theme === "dark"
        ? "bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger:
      theme === "dark"
        ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500"
        : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

export default Button;
