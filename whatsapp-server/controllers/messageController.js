// import { Mongoose } from "mongoose";
import Message from "../models/messageModel.js";

export async function sendMessage(req, res, next) {
  try {
    const msg = req.body;
    const newMsg = new Message({
        sender: msg.sender,
        receiver: msg.receiver,
        message: msg.message,
        sentAt: msg.sentAt
      });
    await newMsg.save();
    return res.status(201).json({
      status: "sent",
      newMsg,
    });
  } catch (error) {
    console.log("Error occured while sending the message",error);
  }
}



export async function getMessages(req, res) {
    const { userId1, userId2 } = req.params;
  
    try {
      const messages = await Message.find({
        $or: [
          { sender: userId1, receiver: userId2 },
          { sender: userId2, receiver: userId1 },
        ],
      }).sort({ sentAt: 1 }); // Sort messages by sentAt timestamp
  
      res.status(200).json({
        status: "success",
        data: messages,
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({
        status: "error",
        message: "Error fetching messages",
      });
    }
  }