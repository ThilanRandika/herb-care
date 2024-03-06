import mongoose from "mongoose";
const { Schema } = mongoose;

const StaffMemberSchema = new Schema(
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

module.exports = mongoose.model("StaffMember", StaffMemberSchema);

export default StaffMember;