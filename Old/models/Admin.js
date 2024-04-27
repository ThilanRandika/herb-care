const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {type: 'String', required: true},
    email: {type: 'String', required: true, unique: true},
    contactnumber: {type: 'Number', required: true},
    username: {type: 'String', required: true},
    password: {type: 'String', required: true},    
    SecAnswer: {type: 'String', required: true},

},{timestamps: true})

const AdminModel = mongoose.model('admin_details', adminSchema);

module.exports = AdminModel;