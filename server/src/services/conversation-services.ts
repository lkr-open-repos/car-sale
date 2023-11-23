import { ConversationDocument } from "../types";
import { Conversation } from "../models";

export const getConversationsByUserService = async (
  userId: string
): Promise<ConversationDocument[]> => {
  const conversations: ConversationDocument[] = await Conversation.find({
    members: { $in: [userId] },
  })
    .populate("members", "name", { _id: { $ne: userId } } as any)
    .exec();

  console.log("conversations service 13", conversations);

  return conversations;
};
