import React, { useEffect } from "react";

const FixedDeposits = ({ onRender }) => {
  useEffect(() => {
    onRender("fd", "fd");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <h1>FixedDeposits</h1>;
};

export default FixedDeposits;
