const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {type: 'String', required: true},
    email: {type: 'String', required: true, unique: true},
    contactnumber: {type: 'Number', required: true},
    username: {type: 'String', required: true},
    password: {type: 'String', required: true},
    gender: {type: 'String', required: true},    
    subject: {type: 'String', required: true},
    SecAnswer: {type: 'String', required: true},

},{timestamps: true})

const TeacherModel = mongoose.model('teacher_details', teacherSchema);

module.exports = TeacherModel;