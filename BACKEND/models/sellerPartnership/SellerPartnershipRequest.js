const mongoose = require("mongoose");

const partnershipRequestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    seller_name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    company_discription: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact_num: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    tax_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["request_pending", "discussion_state"],
      default: "request_pending",
    },
  },
  { timestamps: true }
);

const PartnershipRequest = mongoose.model("partnershipRequest", partnershipRequestSchema);
module.exports = PartnershipRequest;
