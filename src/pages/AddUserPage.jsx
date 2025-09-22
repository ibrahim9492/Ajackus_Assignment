// src/pages/AddUserPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import Card from "../components/ui/Card";
import UserForm from "../components/UserForm";

const AddUserPage = () => {
  const { createUser } = useUsers();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null); // Dashboard-style error handling

  const handleSubmit = async (userData) => {
    setIsSubmitting(true);
    setFormError(null); // reset previous errors
    try {
      await createUser(userData);
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      setFormError(error.message || "Failed to add user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 animate-text-fade">
        Add New User
      </h1>

      <Card className="w-full max-w-3xl p-8 rounded-2xl shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 transform transition-all  duration-300">
        <UserForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          error={formError} // Dashboard-style error prop
        />
      </Card>
    </div>
  );
};

export default AddUserPage;
