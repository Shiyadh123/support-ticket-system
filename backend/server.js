import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import { createAgent } from "./controllers/agentController.js";
import {
  createTicket,
  getTickets,
  resolveTicket,
} from "./controllers/ticketController.js";

const app = express();
dotenv.config();
connectDB();
app.use(bodyParser());

app.get("/", (req, res) => {
  res.send("API is working....................");
});

app.get("/api/support-tickets", getTickets);
app.post("/api/support-tickets", createTicket);
app.post("/api/support-agents", createAgent);
app.patch("/api/resolve-ticket", resolveTicket);

app.listen(process.env.PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
