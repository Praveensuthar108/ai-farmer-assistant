import React from 'react';

const Icon = ({ name, className = '', style = {} }) => {
  return <i className={`fa-solid fa-${name} ${className}`} style={style}></i>;
};

export default Icon;

// Made with Bob
