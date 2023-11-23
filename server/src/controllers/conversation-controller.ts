import { Conversation } from "../models";
import { getConversationsByUserService } from "../services/conversation-services";
import { Request, Response, NextFunction } from "../types";

import { ConversationDocument } from "../types";
import { throwErrorHelper } from "../utils";

export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let newConversation: ConversationDocument;

  newConversation = await Conversation.create({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    return next(throwErrorHelper(err));
  }
};

export const getConversationsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let conversations: ConversationDocument[] = [];
  try {
    conversations = await getConversationsByUserService(req.params.userId);
  } catch (err) {
    return next(throwErrorHelper(err));
  }
  res
    .status(200)
    .json(
      conversations.map((conversation) =>
        conversation.toObject({ getters: true })
      )
    );
};

export const getConversationByUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const conversation = await Conversation.find({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    return next(throwErrorHelper(err));
  }
};
