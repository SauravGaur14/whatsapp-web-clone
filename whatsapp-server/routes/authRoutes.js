import { Router } from "express";
import { getAllUsers, loginUser } from "../controllers/authController.js";

const router = Router();

router.post("/login-user", loginUser);
router.get("/get-contacts", getAllUsers);

export default router;
