import Agent from "../models/agentModel.js";
import { assignAgent } from "../utils/assignAgent.js";

const createAgent = async (req, res) => {
  try {
    const agent = new Agent({
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
      phone: req.body.phone,
      active: true,
    });

    const createdAgent = await agent.save();
    await assignAgent();
    res.status(201).json(createdAgent);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export { createAgent };
