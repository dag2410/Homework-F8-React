import React from "react";
import "./Button.css";
const Button = ({ variant, size, children, onClick }) => {
  const _variant = variant ? `btn-${variant}` : "";
  const _size = size ? `btn-${size}` : "";
  return (
    <button onClick={onClick} className={`btn ${_variant} ${_size}`}>
      {children}
    </button>
  );
};

export default Button;
