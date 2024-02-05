import classes from "./SendMessage.module.css";
import { useState } from "react";
import SendButton from "../SendButton/SendButton";
import { Socket } from "socket.io-client";

interface IProps {
  activeConversation: string | null;
  socket: Socket | null;
}

const SendMessage = ({ activeConversation, socket }: IProps): JSX.Element => {
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
        socket={socket}
        messageText={messageText}
        activeConversation={activeConversation}
      >
        Send
      </SendButton>
    </div>
  );
};

export default SendMessage;
