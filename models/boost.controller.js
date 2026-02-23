import mongoose from "mongoose";

const boostSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Boost = mongoose.model("Boost", boostSchema);

export default Boost;
