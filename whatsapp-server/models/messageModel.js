import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messageType: {
    type: String,
    default: "text",
    enum: ["text", "audio", "image", "video", "file"],
  },
  message: {
    type: String,
    required: true,
  },
  messageStatus: {
    type: String,
    default: "sent",
  },
  sentAt: {
    type: Date,
    default: Date.now(),
  },
});

const Message = model("Message", messageSchema);

export default Message;

