import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
    },
    severity: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
    },
    assignedName: {
      type: String,
    },
    status: {
      type: String,
    },
    resolvedOn: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Ticket", ticketSchema);

export default User;
