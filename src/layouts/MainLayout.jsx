import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ rotate: 180, scale: 0.85 }}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className={`p-2 rounded-full shadow-lg ${
        theme === "light"
          ? "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
          : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </motion.button>
  );
};

const MainLayout = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Add User", path: "/add" },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark"
          ? "bg-gray-950 text-gray-100"
          : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      {/* Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`sticky top-0 z-50 backdrop-blur-lg ${
          scrolled ? "shadow-lg" : "shadow-sm"
        } ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-900/80 to-gray-800/80"
            : "bg-gradient-to-r from-white/80 to-gray-100/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              scrolled ? "h-14" : "h-16"
            }`}
          >
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="/"
                className={`text-2xl font-extrabold tracking-wide ${
                  theme === "dark"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                }`}
              >
                User Management
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden mr-40   md:flex space-x-6 relative">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <Link
                      to={link.path}
                      className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${
                        isActive
                          ? theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                          : theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="active-pill"
                          className={`absolute inset-0 rounded-full -z-10 ${
                            theme === "dark"
                              ? "bg-blue-500/30"
                              : "bg-blue-500/20"
                          }`}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Right Side (Theme + Menu) */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`md:hidden px-4 pb-4 space-y-3 ${
                theme === "dark" ? "bg-gray-900/95" : "bg-white/95"
              }`}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? theme === "dark"
                          ? "bg-blue-500/30 text-white"
                          : "bg-blue-500/20 text-gray-900"
                        : theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className={`shadow mt-auto ${
          theme === "dark" ? "bg-gray-900/90" : "bg-white/90"
        }`}
      >
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p
            className={`text-center text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © {new Date().getFullYear()} User Management Dashboard. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
