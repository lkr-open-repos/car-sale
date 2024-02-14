import Conversations from "../Conversations/Conversations";
import classes from "./MyMessages.module.css";
import Messenger from "../Messages/Messages";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface IProps {
  conversationId?: string;
}

const MyMessages = ({ conversationId }: IProps) => {
  const [activeConversation, setActiveConversation] = useState<string | null>(
    conversationId || null
  );

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("ws://localhost:5000");

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const setConversationHandler = (conversationId: string | null) => {
    setActiveConversation(conversationId);
    socketRef.current?.emit("joinConversation", conversationId);
  };

  return (
    <div className={`${classes["messenger-container"]} flex`}>
      <Conversations
        setActiveConversation={setConversationHandler}
        activeConversation={activeConversation}
      />
      <Messenger
        activeConversation={activeConversation}
        socket={socketRef.current}
      />
    </div>
  );
};

export default MyMessages;
