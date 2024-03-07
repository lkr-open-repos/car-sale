import { useCreateConversationMutation } from "@/app/api/conversationsApiSlice";
import { selectCurrentUser } from "@/app/authSlice";
import Button from "@/components/shared/Button/Button";
import { sendErrorLog } from "@/utils/sendErrorLog";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

interface IProps {
  children: string;
  targetUser: string;
}

const MessageButton = ({ children, targetUser }: IProps): JSX.Element => {
  const onClickHandler = async () => {
    if (!user) {
      return navigate("/auth", { state: { from: location }, replace: true });
    }

    const createConversationHelper = async () => {
      try {
        await createConversation({
          senderId: user!.id,
          receiverId: targetUser,
        });
        console.log("Conversation created successfully!");
      } catch (error: any) {
        sendErrorLog(`${error.message} => Create Conversation Error`);
        console.error("Error creating conversation:", error);
      }
    };

    createConversationHelper();
  };
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const [createConversation, { data: conversationData }] =
    useCreateConversationMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (conversationData?.id) {
      navigate("/user", {
        state: { from: location, conversation: conversationData },
      });
    }
  }, [conversationData]);

  return <Button onClick={onClickHandler}>{children}</Button>;
};

export default MessageButton;
