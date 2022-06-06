import React, { useEffect } from "react";

const NotFound = ({ onRender }) => {
  useEffect(() => {
    onRender("faq", "faq");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <h1>404 - Not Found</h1>
    </div>
  );
};

export default NotFound;
