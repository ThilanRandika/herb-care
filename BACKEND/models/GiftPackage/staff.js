const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
    {
        //staff name
        name: {
            type : String,
            required: true
        },

        //staff email
        email: {
            type : String,
            required: true
        }
    },
    { timestamps: true }
);

const Staff = mongoose.model("Staff",staffSchema)

module.exports = Staff;