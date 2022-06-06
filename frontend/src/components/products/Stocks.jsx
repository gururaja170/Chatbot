import React, { useEffect } from "react";
import Card from "../common/Card";
import { Link } from "react-router-dom";

const Stocks = ({ onRender, stocks }) => {
  useEffect(() => {
    onRender("stocks", "stocks");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="d-flex flex-wrap gap-3 mt-5">
      {stocks.map((stock) => (
        <Link
          key={stock._id}
          className="text-decoration-none text-dark"
          to={`stocks/${stock._id}`}
        >
          <Card name={stock.name} label={`Price : Rs. ${stock.price}`} />
        </Link>
      ))}
    </div>
  );
};

export default Stocks;
