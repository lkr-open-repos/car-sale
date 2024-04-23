import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import classes from "./Messages.module.css";
import SendMessage from "../SendMessage/SendMessage";
import { useLazyGetMessagesByConversationQuery } from "@/app/api/messagesApiSplice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";
import { IMessage } from "@/types/messageInterface";
import Spinner from "@/components/shared/Spinner/Spinner";
import { sendErrorLog } from "@/utils/sendErrorLog";

interface IProps {
  activeConversation: string | null;
  socket: Socket | null;
}

const Messages = ({ activeConversation, socket }: IProps): JSX.Element => {
  const [trigger, { data: messages, isLoading }] =
    useLazyGetMessagesByConversationQuery();

  const user = useSelector(selectCurrentUser);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [combinedMessages, setCombinedMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const updateMessages = (activeConversation: string) => {
      trigger(activeConversation)
        .unwrap()
        .then((data) => {
          setCombinedMessages(data);
        })
        .catch((error) => {
          sendErrorLog(
            `${error.message} => updateMessages in Messages Component`
          );
        })
        .finally(() => {
          document
            .getElementById(activeConversation)
            ?.scrollIntoView({ behavior: "smooth" });
        });
    };

    if (activeConversation) {
      updateMessages(activeConversation);
      socket?.on("recieveMessage", () => {
        updateMessages(activeConversation);
      });
    }
  }, [activeConversation, socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, combinedMessages]);

  return (
    <div className={`${classes["messages-container"]} flex`}>
      <div className={`${classes["message-container"]} flex`}>
        {!activeConversation && (
          <h2 className={classes["select-conversation-text"]}>
            Please select a conversation
          </h2>
        )}
        {isLoading && <Spinner />}
        {messages?.map((message) => (
          <React.Fragment key={message.id}>
            <div
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
        <div ref={scrollRef}></div>
      </div>
      {activeConversation && (
        <SendMessage activeConversation={activeConversation} socket={socket} />
      )}
    </div>
  );
};

export default Messages;
