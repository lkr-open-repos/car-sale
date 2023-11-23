import { Model, Document, Schema } from "mongoose";

export interface IConversation {
  members: Array<any>;
}

export interface ConversationDocument extends IConversation, Document {}

export interface ConversationModel extends Model<ConversationDocument> {}
