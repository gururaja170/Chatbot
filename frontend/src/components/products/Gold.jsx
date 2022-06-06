import React, { useEffect } from "react";

const Gold = ({ onRender }) => {
  useEffect(() => {
    onRender("gold", "gold");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <h1>Gold</h1>;
};

export default Gold;
