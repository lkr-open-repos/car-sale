import { model, Schema } from "mongoose";
import { ConversationDocument } from "../types";

const ConversationSchema = new Schema(
  {
    members: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: true,
    },
  },
  { timestamps: true }
);

export const Conversation = model<ConversationDocument>(
  "Conversation",
  ConversationSchema
);
