import Spinner from "@/components/shared/Spinner/Spinner";
import classes from "./Conversations.module.css";
import { useGetConversationsByUserQuery } from "@/app/api/conversationsApiSlice";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";

interface IProps {
  activeConversation?: string | null;
  setActiveConversation: (conversationId: string | null) => void;
}

const Conversations = ({
  activeConversation,
  setActiveConversation,
}: IProps): JSX.Element => {
  const user = useSelector(selectCurrentUser);

  const {
    data: conversations,
    isLoading,
    isError,
  } = useGetConversationsByUserQuery(user!.id);

  // console.log(data?.map((conversation) => conversation.members[0]));

  useEffect(() => {
    setActiveConversation(activeConversation || null);
  }, [activeConversation]);

  return (
    <div className={`${classes["conversations-container"]} flex`}>
      {isLoading && <Spinner />}
      {isError && <div>Error</div>}
      {conversations &&
        conversations.map(
          (conversation) =>
            conversation.members[0]?.name && (
              <p
                key={conversation.id}
                onClick={() => setActiveConversation(conversation.id)}
              >
                {conversation.members[0].name}
              </p>
            )
        )}
    </div>
  );
};

export default Conversations;
