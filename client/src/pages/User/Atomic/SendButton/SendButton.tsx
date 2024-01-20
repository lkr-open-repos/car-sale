import Button from "@/components/shared/Button/Button";
import { useCreateMessageMutation } from "@/app/api/messagesApiSplice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";

interface IProps {
  activeConversation: string | null;
  children: string;
  messageText: string | null;
}

const SendButton = ({
  children,
  activeConversation,
  messageText,
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
      console.log(message);
    }
  };

  return <Button onClick={onClickHandler}>{children}</Button>;
};

export default SendButton;
