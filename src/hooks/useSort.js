import { useState } from 'react';

export const useSort = (initialField = 'id', initialDirection = 'asc') => {
  const [sortField, setSortField] = useState(initialField);
  const [sortDirection, setSortDirection] = useState(initialDirection);
  
  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };
  
  return {
    sortField,
    sortDirection,
    handleSort,
  };
};