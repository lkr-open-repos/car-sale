import { Conversation } from "../models";
import {
  getConversationByUsersService,
  getConversationsByUserService,
} from "../services/conversation-services";
import { Request, Response, NextFunction } from "../types";

import { ConversationDocument } from "../types";
import { throwErrorHelper } from "../utils";

export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let conversation: ConversationDocument | null;

  try {
    conversation = await getConversationByUsersService(
      req.body.senderId,
      req.body.receiverId
    );
    if (!conversation) {
      conversation = await Conversation.create({
        members: [req.body.senderId, req.body.receiverId],
      });

      conversation = await conversation.save();
    }
  } catch (err) {
    return next(throwErrorHelper(err));
  }

  res.status(200).json(conversation.toObject({ getters: true }));
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
    const conversation = await getConversationByUsersService(
      req.body.firstUserId,
      req.body.secondUserId
    );
    res.status(200).json(conversation?.toObject({ getters: true }));
  } catch (err) {
    return next(throwErrorHelper(err));
  }
};
