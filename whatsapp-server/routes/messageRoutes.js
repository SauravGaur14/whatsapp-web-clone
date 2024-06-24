import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = Router();

router.post("/send-message", sendMessage);
router.get("/get-messages/:userId1/:userId2", getMessages);
export default router;
