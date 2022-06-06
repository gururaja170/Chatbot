import { createChatBotMessage } from "react-chatbot-kit";
import { getCurrentUser } from "./../../services/authService";
import BotAvatar from "./BotAvatar";
import Faqs from "./widgets/Faqs";
import RaiseTicket from "./widgets/RaiseTicket";

let name = "";

try {
  name = getCurrentUser().name.split(" ")[0];
} catch (ex) {}

const Config = {
  initialMessages: [
    createChatBotMessage(`Hello ${name}, I'm Growwbot.`),
    createChatBotMessage("Perhaps these will help", {
      withAvatar: false,
      widget: "faqs",
    }),
  ],
  botName: "Groww Bot",
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  state: {
    faqs: null,
  },
  widgets: [
    {
      widgetName: "faqs",
      widgetFunc: (props) => <Faqs {...props} />,
      mapStateToProps: ["faqs"],
    },
    {
      widgetName: "raiseTicket",
      widgetFunc: (props) => <RaiseTicket {...props} />,
    },
  ],
};

export default Config;
