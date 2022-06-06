import { getFaq, getFaqsBasedOnMsg, saveFaq } from "../../services/faqService";
import { getCurrentUser } from "./../../services/authService";

class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
    try {
      this.name = getCurrentUser().name.split(" ")[0];
    } catch (error) {
      this.name = "";
    }
  }

  greet = () => {
    const message = this.createChatBotMessage(`Hello ${this.name}`);
    this.addMessageToBotState(message);
  };

  getFaq = async (faq) => {
    faq = await getFaq(faq._id);
    const message = this.createChatBotMessage(faq.answer, { withAvatar: true });
    this.addMessageToBotState(message);
  };

  raiseTicket = async (question) => {
    let msg = this.createChatBotMessage(
      "Some Problem occured, please try again"
    );
    try {
      await saveFaq({
        category: "faq",
        question: question,
        isAnswered: false,
      });
      msg = this.createChatBotMessage(
        `Successfully raised a ticket for the above question i.e ${question}`
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        msg = this.createChatBotMessage("Already, raised a ticket");
      }
    }
    this.addMessageToBotState(msg);
  };

  handleMessage = async (message) => {
    try {
      sessionStorage.setItem("ticketQuestion", message);
      const { data: faqs } = await getFaqsBasedOnMsg(message);
      if (Array.isArray(faqs)) {
        this.setState((state) => ({
          ...state,
          faqs: faqs,
        }));
        const msg = this.createChatBotMessage("Maybe these will help", {
          widget: "faqs",
        });
        this.addMessageToBotState(msg);
      } else {
        const msg = this.createChatBotMessage(faqs.answer);
        this.addMessageToBotState(msg);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const msg = this.createChatBotMessage(
          "Sorry no Relevant FAQ's Found. Please raise a ticket",
          { widget: "raiseTicket" }
        );
        this.addMessageToBotState(msg);
      }
    }
  };

  addMessageToBotState = (message) => {
    if (Array.isArray(message)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...message],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, message],
      }));
    }
  };
}

export default ActionProvider;
