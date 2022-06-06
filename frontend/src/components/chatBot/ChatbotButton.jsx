import React from "react";

const ChatbotButton = ({ onClick }) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="btn btn-sm p-3 rounded-circle m-4 bg-dark text-white d-inline-block"
    >
      Bot
    </div>
  );
};

export default ChatbotButton;
