import React, { useEffect } from "react";

const StockDesc = ({ stocks, match, onRender }) => {
  useEffect(() => {
    onRender("stocks", match.params.id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const stock = stocks.filter((stock) => stock._id === match.params.id)[0];
  if (!stock) return null;
  return (
    <div className="mt-4 ms-4">
      <h4>Name : {stock.name}</h4>
      <h4>Price : {stock.price}</h4>
    </div>
  );
};

export default StockDesc;
