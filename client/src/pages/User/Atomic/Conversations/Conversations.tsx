import Spinner from "@/components/shared/Spinner/Spinner";
import classes from "./Conversations.module.css";
import { useGetConversationsByUserQuery } from "@/app/api/conversationsApiSlice";

interface IProps {
  userId: string;
}

const Conversations: React.FC<IProps> = ({ userId }) => {
  const { data, isLoading, isError } = useGetConversationsByUserQuery(userId);

  isLoading && <div>Loading</div>;
  isError && <div>Error</div>;

  console.log(data?.map((conversation) => conversation.members[0]));

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <div>Error</div>}
      {data &&
        data.map(
          (conversation) =>
            conversation.members[0].name && (
              <div key={conversation.id}>{conversation.members[0].name}</div>
            )
        )}
    </>
  );
};

export default Conversations;
