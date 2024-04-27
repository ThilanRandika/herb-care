const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {type: 'String', required: true},
    email: {type: 'String', required: true, unique: true},
    contactnumber: {type: 'Number', required: true},
    username: {type: 'String', required: true},
    password: {type: 'String', required: true},
    gender: {type: 'String', default: 'Male'},
    parentname: {type: 'String', default: 'None'},
    parentphonenumber: {type: 'Number', default: 0},
    SecAnswer: {type: 'String', default: 'None'},

},{timestamps: true})

const StudentModel = mongoose.model('student_details', studentSchema);

module.exports = StudentModel;