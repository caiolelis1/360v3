import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

import authRoutes from "./routes/auth.js";
import gradeRoutes from "./routes/grades.js";
import memberRoutes from "./routes/members.js";
import subsystemRoutes from "./routes/subsystems.js";
import systemRoutes from "./routes/systems.js";

//middlewares

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://avaliacao360.vercel.app",
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/grade", gradeRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/subsystem", subsystemRoutes);
app.use("/api/system", systemRoutes);

app.listen(8800, () => {
  console.log("API working");
});
