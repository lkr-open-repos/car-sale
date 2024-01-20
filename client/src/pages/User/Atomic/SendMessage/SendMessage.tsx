import classes from "./SendMessage.module.css";
import { useState } from "react";
import SendButton from "../SendButton/SendButton";

const SendMessage = ({
  activeConversation,
}: {
  activeConversation: string | null;
}): JSX.Element => {
  const [messageText, setMessageText] = useState("");

  return (
    <div className={`${classes["send-message-container"]} flex`}>
      <textarea
        name="message"
        placeholder="Your Message"
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
      />

      <SendButton
        messageText={messageText}
        activeConversation={activeConversation}
      >
        Send
      </SendButton>
    </div>
  );
};

export default SendMessage;
