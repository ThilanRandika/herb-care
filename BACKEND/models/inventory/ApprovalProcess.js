import mongoose from "mongoose";

const { schema } = mongoose;

const ApprovalProcess = new schema({

    //Products attributes
    name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      Manufactured_price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        default: 0,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image_url: {
        type: String,
      },
      expireDate: {
        type: Date,
        required: true
      },
      manufactureDate: {
        type: Date,
        required: true
      },
      ingredients: {
        type:String,
        required: true
      },

    //Extra ones
      action: {
        type: String,
        enum: ["Add", "Remove", "Update"],
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
      staff_submission_date: {
        type: Date,
        default: Date.now,
      },
      staff_member_id: {
        type: Schema.Types.ObjectId,
        ref: "StaffMember",
        required: true,
      },
      inventory_manager_id: {
        type: Schema.Types.ObjectId,
        ref: "InventoryManager",
        required: true,
      },
      inventory_Manager_comments: {
        type: String,
      },

});
