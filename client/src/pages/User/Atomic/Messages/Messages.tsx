import { useEffect } from "react";
import classes from "./Messages.module.css";
import SendMessage from "../SendMessage/SendMessage";
import { useLazyGetMessagesByConversationQuery } from "@/app/api/messagesApiSplice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";

interface IProps {
  activeConversation: string | null;
}

const Messages = ({ activeConversation }: IProps): JSX.Element => {
  const [trigger, { data: messages, isLoading, isError }] =
    useLazyGetMessagesByConversationQuery();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (activeConversation) {
      trigger(activeConversation);
      document
        .getElementById(activeConversation)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation]);

  console.log(messages, user!.id);

  return (
    <div className={`${classes["messages-container"]} flex`}>
      <div className={`${classes["message-container"]}`}>
        {messages?.map((message) => (
          <>
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
          </>
        ))}
      </div>
      {activeConversation && (
        <SendMessage activeConversation={activeConversation} />
      )}
    </div>
  );
};

export default Messages;
