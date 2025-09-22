// src/hooks/usePagination.js
import { useState, useEffect } from 'react';

export const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  
  // Reset to page 1 when items change (filtering/sorting)
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);
  
  // Update paginated items when dependencies change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedItems(items.slice(startIndex, endIndex));
  }, [items, currentPage, itemsPerPage]);
  
  // Ensure currentPage is within valid range
  useEffect(() => { 
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  
  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };
  
  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
  };
};