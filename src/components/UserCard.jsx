import React from "react";
import PropTypes from "prop-types";
import Card from "./ui/Card";
import Button from "./ui/Button";

const UserCard = ({ user, onDelete, onEdit }) => (
  <Card className="mb-6 p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-800">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-all duration-500">
      {/* User Info */}
      <div className="flex-1 space-y-1 transition-transform duration-500 hover:translate-y-[-2px]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 truncate">
          {user.email}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {user.department}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap sm:flex-col sm:space-y-2 gap-2 mt-3 sm:mt-0">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(user)}
          className="w-full sm:w-auto hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(user.id)}
          className="w-full sm:w-auto hover:bg-red-700 transition-all duration-300"
        >
          Delete
        </Button>
      </div>
    </div>
  </Card>
);

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserCard;
