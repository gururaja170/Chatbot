import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "../../styles/chatbot.css";
import Config from "./Config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const ChatBot = ({ currentPage, subCategory }) => {
  const saveMessages = (messages) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    try {
      localStorage.setItem("pageId", currentPage);
      localStorage.setItem("subCategory", subCategory);
      sessionStorage.removeItem("ticketQuestion");
      const messages = JSON.parse(localStorage.getItem("chat_messages"));
      return messages;
    } catch (ex) {
      return [];
    }
  };

  const validator = (msg) => {
    return msg !== "";
  };

  return (
    <div className="shadow-lg rounded-4 d-inline-block">
      <Chatbot
        headerText="Groww Chatbot"
        config={Config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        saveMessages={saveMessages}
        messageHistory={loadMessages()}
        validator={validator}
      />
    </div>
  );
};

export default ChatBot;
