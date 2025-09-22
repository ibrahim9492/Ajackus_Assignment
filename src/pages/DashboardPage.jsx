// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { useUsers } from "../context/UserContext";
import { useDebounce } from "../hooks/useDebounce";
import { usePagination } from "../hooks/usePagination";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import Pagination from "../components/ui/Pagination";
import UserTable from "../components/UserTable";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import Modal from "../components/ui/Modal";
import {
  FunnelIcon,
  Squares2X2Icon,
  TableCellsIcon,
  XMarkIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const DashboardPage = () => {
  const {
    users,
    loading,
    error,
    filters,
    searchTerm,
    setFilters,
    setSearchTerm,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [viewMode, setViewMode] = useState("table");
  const [showFilters, setShowFilters] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(
    users,
    itemsPerPage
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  useEffect(() => {
    goToPage(1);
  }, [filters, searchTerm]);

  const handleClearFilters = () => {
    setFilters({ firstName: "", lastName: "", email: "", department: "" });
    setSearchTerm("");
  };

  const hasActiveFilters =
    searchTerm ||
    filters.firstName ||
    filters.lastName ||
    filters.email ||
    filters.department;

  const handleAddUser = async (userData) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      await createUser(userData);
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding user:", err);
      setFormError(err.message || "Failed to add user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditUser = async (userData) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      await updateUser({ ...userData, id: selectedUser.id });
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating user:", err);
      setFormError(err.message || "Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
    setFormError(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            User Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your users</p>
        </div>
        <Button
          onClick={() => {
            setShowAddModal(true);
            setFormError(null);
          }}
          className="flex items-center gap-2 transition-transform transform hover:scale-105 duration-300"
        >
          <UserPlusIcon className="h-5 w-5" /> Add User
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="transition-all duration-500 ease-in-out">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search users..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 transition-colors duration-300"
            >
              <FunnelIcon className="h-5 w-5" /> Filters
            </Button>

            {hasActiveFilters && (
              <Button
                variant="secondary"
                onClick={handleClearFilters}
                className="flex items-center gap-1 transition-colors duration-300"
              >
                <XMarkIcon className="h-5 w-5" /> Clear Filters
              </Button>
            )}

            <div className="flex border rounded-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 transition-colors duration-300 ${
                  viewMode === "table"
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <TableCellsIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 transition-colors duration-300 ${
                  viewMode === "card"
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out">
            {["firstName", "lastName", "email", "department"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  value={filters[field]}
                  onChange={(e) => handleFilterChange(field, e.target.value)}
                  className="input transition-all duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Users Table / List */}
      <Card className="transition-all duration-500">
        {loading ? (
          <div className="flex justify-center items-center h-64 opacity-0 animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {viewMode === "table" ? (
              <UserTable
                users={paginatedItems}
                onDelete={handleDelete}
                onEdit={openEditModal}
              />
            ) : (
              <UserList
                users={paginatedItems}
                onDelete={handleDelete}
                onEdit={openEditModal}
              />
            )}

            {users.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            )}
          </>
        )}
      </Card>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <UserForm
          onSubmit={handleAddUser}
          onCancel={() => setShowAddModal(false)}
          isSubmitting={isSubmitting}
          error={formError}
        />
      </Modal>

      {/* Edit User Modal */}
      {selectedUser && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit User"
        >
          <UserForm
            user={selectedUser}
            onSubmit={handleEditUser}
            onCancel={() => setShowEditModal(false)}
            isSubmitting={isSubmitting}
            error={formError}
          />
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
