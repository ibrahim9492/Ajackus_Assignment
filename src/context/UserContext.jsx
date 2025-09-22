// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchUsers,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "../services/apiService";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  // Apply filters, search, and sorting
  useEffect(() => {
    let result = [...users];

    if (filters.firstName) {
      result = result.filter((user) =>
        user.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }
    if (filters.lastName) {
      result = result.filter((user) =>
        user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    }
    if (filters.email) {
      result = result.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.department) {
      result = result.filter((user) =>
        user.department.toLowerCase().includes(filters.department.toLowerCase())
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.department.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
    });

    setFilteredUsers(result);
  }, [users, filters, searchTerm, sortField, sortDirection]);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ✅ Corrected createUser
  const createUser = async (userData) => {
    // Duplicate email check
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (emailExists) {
      throw new Error("Email already in use");
    }

    const newUser = await apiCreateUser(userData);
    setUsers((prev) => [...prev, newUser]);
  };

  // ✅ Corrected updateUser
  const updateUser = async (userData) => {
    const emailExists = users.some(
      (user) =>
        user.id !== userData.id &&
        user.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (emailExists) {
      throw new Error("Email already in use");
    }

    const updatedUser = await apiUpdateUser(userData);
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = async (id) => {
    try {
      await apiDeleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const setFiltersHandler = (newFilters) => setFilters(newFilters);
  const setSearchTermHandler = (term) => setSearchTerm(term);
  const setSorting = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  return (
    <UserContext.Provider
      value={{
        users: filteredUsers,
        loading,
        error,
        filters,
        searchTerm,
        sortField,
        sortDirection,
        createUser,
        updateUser,
        deleteUser,
        setFilters: setFiltersHandler,
        setSearchTerm: setSearchTermHandler,
        setSorting,
        refreshUsers: loadUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
