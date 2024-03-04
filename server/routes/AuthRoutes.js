import { Router } from "express";
import { checkUserExists } from "../controllers/AuthController.js";

const router = Router();

router.post("/check-user", checkUserExists);
// router.post("/check-user", (req, res, next) => {
//     console.log("requested")
//     res.status(200).json({ message: "Received request" });
//     next()
//   });

export default router;
