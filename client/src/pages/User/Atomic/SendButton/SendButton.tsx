import Button from "@/components/shared/Button/Button";
import { useCreateMessageMutation } from "@/app/api/messagesApiSplice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";
import { Socket } from "socket.io-client";

interface IProps {
  activeConversation: string | null;
  children: string;
  messageText: string | null;
  socket: Socket | null;
}

const SendButton = ({
  children,
  activeConversation,
  messageText,
  socket,
}: IProps): JSX.Element => {
  const user = useSelector(selectCurrentUser);

  const [createMessage] = useCreateMessageMutation();

  const onClickHandler = async () => {
    if (activeConversation && user && messageText) {
      const message = await createMessage({
        sender: user.id,
        conversationId: activeConversation,
        text: messageText,
      });
      socket?.emit("sendMessage", {
        room: activeConversation,
        message,
      });
    }
  };

  return <Button onClick={onClickHandler}>{children}</Button>;
};

export default SendButton;
