import { Model, Document, Schema } from "mongoose";

export interface IMessage {
  conversationId: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  text: string;
}

export interface MessageDocument extends IMessage, Document {}

export interface MessageModel extends Model<MessageDocument> {}
