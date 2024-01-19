import mongoose from "mongoose";

const agentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Agent", agentSchema);

export default User;
