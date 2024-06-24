import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, unique: [true, "user already exists"] },
    name: {
      type: String,
      required: true,
    },
    profilePhoto: String,
    about: String,
  },
  {
    virtuals: {
      sentMessages: {
        options: {
          ref: "Message",
          localField: "_id",
          foreignField: "sender",
        },
      },
      receivedMessages: {
        options: {
          ref: "Message",
          localField: "_id",
          foreignField: "receiver",
        },
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = model("User", userSchema);

export default User;
