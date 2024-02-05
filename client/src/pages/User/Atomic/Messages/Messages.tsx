import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import classes from "./Messages.module.css";
import SendMessage from "../SendMessage/SendMessage";
import { useLazyGetMessagesByConversationQuery } from "@/app/api/messagesApiSplice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";

interface IProps {
  activeConversation: string | null;
  socket: Socket | null;
}

const Messages = ({ activeConversation, socket }: IProps): JSX.Element => {
  const [trigger, { data: messages, isLoading, isError }] =
    useLazyGetMessagesByConversationQuery();

  const user = useSelector(selectCurrentUser);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeConversation) {
      trigger(activeConversation);
      document
        .getElementById(activeConversation)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`${classes["messages-container"]} flex`}>
      <div className={`${classes["message-container"]}`}>
        {messages?.map((message) => (
          <React.Fragment key={message.id}>
            <div
              ref={scrollRef}
              className={`${classes.message} ${
                message.sender == user!.id
                  ? classes.sentMessage
                  : classes.receivedMessage
              }`}
              key={message.conversationId}
            >
              <p>{message.text}</p>
            </div>
            <br></br>
          </React.Fragment>
        ))}
      </div>
      {activeConversation && (
        <SendMessage activeConversation={activeConversation} socket={socket} />
      )}
    </div>
  );
};

export default Messages;
