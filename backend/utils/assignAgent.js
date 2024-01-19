import Ticket from "../models/ticketModel.js";
import Agent from "../models/agentModel.js";

const agentQueue = [];
function enqueue(element) {
  agentQueue.push(element);
}
function isEmpty() {
  return agentQueue.length === 0;
}
function dequeue() {
  if (isEmpty()) {
    return;
  }
  return agentQueue.shift();
}
function front() {
  if (isEmpty()) {
    return;
  }
  return agentQueue[0];
}

export const assignAgent = async (res) => {
  try {
    const unAssignedTickets = await Ticket.find({ status: "New" });
    const activeAgents = await Agent.find({ active: true });

    activeAgents.forEach((agent) => {
      if (!agentQueue.includes(String(agent._id))) {
        enqueue(String(agent._id));
      }
    });

    if (unAssignedTickets.length === 0 || agentQueue.length === 0) {
      return;
    }

    const ticket = unAssignedTickets[0];
    const agent = await Agent.findById(front());
    dequeue();

    ticket.status = "Assigned";
    ticket.assignedTo = agent._id;
    ticket.assignedName = agent.name;
    agent.active = false;

    await ticket.save();
    await agent.save();
  } catch (error) {
    console.log(error);
  }
};
