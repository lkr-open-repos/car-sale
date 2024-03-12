import { Conversation } from "../models";
import {
  getConversationByUsersService,
  getConversationsByUserService,
} from "../services/conversation-services";
import { Request, Response, NextFunction } from "../types";

import { ConversationDocument } from "../types";
import { throwErrorHelper } from "../utils";

/**
 * Creates a conversation between two users, or retrieves an existing conversation if it exists.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} a promise that resolves with the conversation object in JSON format
 */
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

/**
 * Retrieves conversations for a specific user and sends the response as JSON.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a Promise that resolves to void
 */
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

/**
 * Retrieves a conversation between two users using the IDs in the request body. Responds with the conversation object in JSON format.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} a promise that resolves with no value
 */
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
