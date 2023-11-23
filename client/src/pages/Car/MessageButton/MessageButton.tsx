import { useCreateConversationMutation } from "@/app/api/conversationsApiSlice";
import { selectCurrentUser } from "@/app/authSlice";
import Button from "@/components/shared/Button/Button";
import { IUser } from "@/types/userInterface";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: string;
  targetUser: string;
}

const MessageButton = ({ children, targetUser }: IProps): JSX.Element => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const [createConversation] = useCreateConversationMutation();

  const onClickHandler = async () => {
    if (!user) {
      <Navigate to="/auth" state={{ from: location }} replace />;
    }

    console.log(targetUser);

    try {
      await createConversation({
        senderId: user!.id,
        receiverId: targetUser,
      });
      console.log("Conversation created successfully!");
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
    <Navigate to="/user" state={{ from: location }} replace />;
  };

  return <Button onClick={onClickHandler}>{children}</Button>;
};

export default MessageButton;
