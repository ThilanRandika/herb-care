const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      default: function () {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString().slice(-2);
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        //include date
        const timestamp = currentDate.getTime();
        return `HCSE-${year}${month}${timestamp}`;
      },
      unique: true,
      required: true,
      //npm install uuid

      /*type: String,
      default: () => `SEHC-${uuidv4()}`,
      unique: true,*/
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default : function () {
        const randomString = Math.random().toString(36).slice(-8);
        return "Password" + randomString;
      },
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
      enum: ["request_pending", "discussion_state", "approved", "inactive"],
      default: "request_pending",
    },
    seller_agreement: {
      type: String,
      required: true,
    },
    // price_margine: {
    //   type: Number,
    //   required: true,
    // },
    unread_notification: {
      type: [String],
      required: false,
    },
    read_notification: {
      type: [String],
      required: false,
    },
    profile_Image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model("seller", sellerSchema);
module.exports = Seller;
