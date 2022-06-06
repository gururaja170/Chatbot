import React from "react";

const RaiseTicket = ({ actionProvider, msg }) => {
  const question = sessionStorage.getItem("ticketQuestion");
  return (
    <button
      className="btn btn-sm rounded-pill mx-2 mb-2 border border-dark bg-danger bg-opacity-10 text-start"
      onClick={() => actionProvider.raiseTicket(question)}
    >
      {msg ? msg : "Click here to raise a ticket"}
    </button>
  );
};

export default RaiseTicket;
