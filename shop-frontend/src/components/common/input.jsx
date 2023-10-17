import React from "react";

const Input = ({ name, label, value ,onChange}) => {
  return (
    <div className="form-group">
      <label for={(name)}>{label}</label>
      <input
        type="text"
        name={name}
        className="form-control"
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
