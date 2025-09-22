import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    // Transform data to match our User structure
    return response.data.map(user => ({
      id: user.id,
      firstName: user.name.split(' ')[0] || '',
      lastName: user.name.split(' ')[1] || '',
      email: user.email,
      department: `Department ${user.id % 10 + 1}`, // Mock department
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const createUser = async (user) => {
  try {
    // JSONPlaceholder doesn't actually create a new user, but returns a mock response
    const response = await api.post('/users', {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    });
    
    return {
      id: response.data.id,
      ...user,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const updateUser = async (user) => {
  try {
    // JSONPlaceholder doesn't actually update the user, but returns a mock response
    await api.put(`/users/${user.id}`, {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    });
    
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};