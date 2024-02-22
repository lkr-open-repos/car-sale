import { ConversationDocument } from "../types";
import { Conversation, HttpError } from "../models";
import { httpErrorLogger } from "../utils";

export const getConversationsByUserService = async (
  userId: string
): Promise<ConversationDocument[]> => {
  let conversations: ConversationDocument[];

  try {
    conversations = await Conversation.find({
      members: { $in: [userId] },
    })
      .populate("members", "name", { _id: { $ne: userId } } as any)
      .exec();
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => query failed => car-service",
    });
    throw new HttpError("No converasations for the user", 500);
  }

  return conversations;
};

export const getConversationByUsersService = async (
  firstUserId: string,
  secondUserId: string
): Promise<ConversationDocument> => {
  let conversation: ConversationDocument | null;

  try {
    conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => query failed => conversation-service",
    });
    throw new HttpError("No converasation for the users", 500);
  }

  if (!conversation) {
    httpErrorLogger.error({
      message: "No converasation for the users => conversation-service",
    });
    throw new HttpError("No converasation for the users", 500);
  }

  return conversation;
};
