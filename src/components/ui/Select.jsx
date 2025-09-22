// src/components/ui/Select.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ options, value, onChange, className = '', ...props }) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className={`input ${className}`}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Select;
