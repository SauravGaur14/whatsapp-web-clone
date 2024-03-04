import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
// import express from "express";
// import cors from "cors";

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception\n");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

console.log("Attempting to connect to the Database");
mongoose.connect(process.env.DATABASE_URL).then((con) => {
  console.log("Connection successfull");
  // console.log(con.connections);
});

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth",AuhtRoutes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on the port ${port}\n`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection\n");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
