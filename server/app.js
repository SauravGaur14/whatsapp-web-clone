import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
// Test middleware
app.use((req, res, next) => {
    // console.log('Headers:\n', req.headers);
    console.log("testing");
  
    next();
  });
app.use("/api/auth", AuthRoutes);

export default app;
