// src/components/UserList.jsx
import React from "react";
import PropTypes from "prop-types";
import UserCard from "./UserCard";

const UserList = ({ users, onDelete, onEdit }) => {
  if (!users.length)
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No users found</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserList;
