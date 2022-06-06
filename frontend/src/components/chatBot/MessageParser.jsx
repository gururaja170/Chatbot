class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const { greet, handleMessage } = this.actionProvider;
    const messageLowercase = message.toLowerCase();
    const greetings = ["hi", "hello", "hey", "hii", "hai"];
    const isGreet = greetings.some((msg) => messageLowercase.startsWith(msg));
    isGreet ? greet() : handleMessage(messageLowercase);
  }
}

export default MessageParser;
