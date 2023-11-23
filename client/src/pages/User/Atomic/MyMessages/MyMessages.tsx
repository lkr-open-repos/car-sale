import { useSelector } from "react-redux";
import Conversations from "../Conversations/Conversations";
import classes from "./MyMessages.module.css";
import { selectCurrentUser } from "@/app/authSlice";

const MyMessages = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <section className={`${classes["messenger-container"]} flex`}>
      <Conversations userId={user!.id} />
      <div className={`${classes["messenger-messages"]} flex`}>something</div>
    </section>
  );
};

export default MyMessages;
