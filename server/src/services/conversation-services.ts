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

  return conversations;
};

export const getConversationByUsersService = async (
  firstUserId: string,
  secondUserId: string
): Promise<ConversationDocument | null> => {
  const conversation = await Conversation.findOne({
    members: { $all: [firstUserId, secondUserId] },
  });

  return conversation;
};
