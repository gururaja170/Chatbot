import React from "react";

const Card = ({ name, label }) => {
  return (
    <div
      className="card p-5 bg-secondary bg-opacity-10 mx-auto"
      style={{ width: "18rem" }}
    >
      <h3 className="card-img-top">{name}</h3>
      <div className="card-body">
        <h6 className="card-text text-nowrap">{label}</h6>
      </div>
    </div>
  );
};

export default Card;
