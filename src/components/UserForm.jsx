// src/components/UserForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { validateEmail } from "../utils/validators";

const UserForm = ({ user, onSubmit, onCancel, isSubmitting, error }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        department: user.department || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case "firstName":
        if (!formData.firstName.trim())
          newErrors.firstName = "First name is required";
        else delete newErrors.firstName;
        break;
      case "lastName":
        if (!formData.lastName.trim())
          newErrors.lastName = "Last name is required";
        else delete newErrors.lastName;
        break;
      case "email":
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!validateEmail(formData.email))
          newErrors.email = "Enter a valid email";
        else delete newErrors.email;
        break;
      case "department":
        if (!formData.department.trim())
          newErrors.department = "Department is required";
        else delete newErrors.department;
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.department.trim())
      newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (validateForm()) onSubmit(formData);
  };

  return (
    <>
      {/* API / Context Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-md animate-fade-in">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["firstName", "lastName", "email", "department"].map((field) => (
          <div key={field} className="relative">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <Input
              type={field === "email" ? "email" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={() => handleBlur(field)}
              className={`transition-all duration-300 ${
                touched[field] && errors[field]
                  ? "border-red-500 ring-1 ring-red-400 focus:ring-red-500"
                  : "focus:ring-blue-400"
              }`}
            />
            {touched[field] && errors[field] && (
              <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
            className="transition-transform transform hover:scale-105 duration-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="transition-transform transform hover:scale-105 duration-300"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  error: PropTypes.string,
};

export default UserForm;
