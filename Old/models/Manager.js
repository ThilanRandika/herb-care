const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    name: {type: 'String', required: true},
    email: {type: 'String', required: true, unique: true},
    contactnumber: {type: 'Number', required: true},
    username: {type: 'String', required: true},
    password: {type: 'String', required: true},    
    SecAnswer: {type: 'String', required: true},

},{timestamps: true})

const ManagerModel = mongoose.model('manager_details', managerSchema);

module.exports = ManagerModel;