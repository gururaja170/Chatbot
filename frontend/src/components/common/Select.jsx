import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select {...rest} id={name} name={name} className="form-control">
        <option value=""></option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name ? option.name : option.question}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
