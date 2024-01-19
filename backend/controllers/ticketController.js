import Ticket from "../models/ticketModel.js";
import Agent from "../models/agentModel.js";
import { assignAgent } from "../utils/assignAgent.js";

const createTicket = async (req, res) => {
  try {
    const ticket = new Ticket({
      topic: req.body.topic,
      description: req.body.description,
      severity: req.body.severity,
      type: req.body.type,
      dateCreated: req.body.dateCreated,
      status: "New",
      assignedTo: "",
      assignedName: "",
      resolvedOn: "",
    });

    const response = await ticket.save();
    await assignAgent();

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const resolveTicket = async (req, res) => {
  try {
    const ticketId = req.body._id;
    const ticket = await Ticket.findById(ticketId);

    if (ticket.status == "Resolved") {
      res.status(200).json({
        message: "Already resolved",
      });
    }

    const agent = await Agent.findById(ticket.assignedTo);
    ticket.status = "Resolved";
    ticket.resolvedOn = Date.now();
    agent.active = true;
    await agent.save();
    await ticket.save();
    await assignAgent(res);

    res.status(200).json({
      message: "Ticket resolved",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getTickets = async (req, res) => {
  const { sort, statusFilter, severityFilter, typeFilter } = req.query;
  const filter = {};

  if (statusFilter !== undefined && statusFilter !== "all") {
    filter.status = statusFilter;
  }

  if (severityFilter !== undefined && severityFilter !== "all") {
    filter.severity = severityFilter;
  }

  if (typeFilter !== undefined && typeFilter !== "all") {
    filter.type = typeFilter;
  }

  try {
    if (sort !== "all") {
      const sortOrder = sort.substr(0, 3) === "Asc" ? 1 : -1;
      const sortField =
        sort.substr(4) === "Date Created" ? "dateCreated" : "resolvedOn";
      const tickets = await Ticket.find(filter).sort({
        [sortField]: sortOrder,
      });
      res.status(200).json(tickets);
    } else {
      const tickets = await Ticket.find(filter);
      res.status(200).json(tickets);
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export { createTicket, getTickets, resolveTicket };
