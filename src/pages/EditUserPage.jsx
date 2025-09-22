import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import Card from '../components/ui/Card';
import UserForm from '../components/UserForm';

const EditUserPage = () => {
  const { id } = useParams();
  const { users, updateUser } = useUsers();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundUser = users.find(u => u.id === parseInt(id));
    if (foundUser) {
      setUser(foundUser);
      setLoading(false);
    } else {
      setLoading(false);
      // User not found, redirect to dashboard
      navigate('/');
    }
  }, [id, users, navigate]);

  const handleSubmit = async (userData) => {
    setIsSubmitting(true);
    try {
      await updateUser({ ...userData, id: parseInt(id) });
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">User not found</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <Card>
        <UserForm
          user={user}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </Card>
    </div>
  );
};

export default EditUserPage;