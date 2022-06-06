import React, { useEffect } from "react";

const MutualFunds = ({ onRender }) => {
  useEffect(() => {
    onRender("mf", "mf");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <h1>MutualFunds</h1>;
};

export default MutualFunds;
