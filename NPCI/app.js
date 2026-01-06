import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectdb from "./lib/db.js";
import path from "path";
import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

import mapperRouter from "./routes/mapperRouter.js";
import otpRouter from "./routes/otpRouter.js";

app.use("/ping", (req, res) => {
  console.log("Hello World");
  res.send("hello world!");
});
app.use("/api/mapper", mapperRouter);
app.use("/api/otp", otpRouter);
// app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(port, () => {
  console.log("App is running on port " + port);
  connectdb();
});

// call api  - address/api/mapper and post method with body {aadhaar: "your_aadhaar_number"}
