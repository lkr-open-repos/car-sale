import Conversations from "../Conversations/Conversations";
import classes from "./MyMessages.module.css";
import Messenger from "../Messages/Messages";
import { useState } from "react";

interface IProps {
  conversationId?: string;
}

const MyMessages = ({ conversationId }: IProps) => {
  const [activeConversation, setActiveConversation] = useState<string | null>(
    conversationId || null
  );

  const setConversationHandler = (conversationId: string | null) => {
    setActiveConversation(conversationId);
  };

  return (
    <div className={`${classes["messenger-container"]} flex`}>
      <Conversations
        setActiveConversation={setConversationHandler}
        activeConversation={activeConversation}
      />
      <Messenger activeConversation={activeConversation} />
    </div>
  );
};

export default MyMessages;
