
import mongoose from "mongoose";

const { Schema } = mongoose;

const InventoryManagerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export const InventoryManager = mongoose.model("InventoryManager", InventoryManagerSchema);

export default InventoryManager;