const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    UserName: {
        type: String, required: true, unique: true,
        minlength: 3, maxlength: 50
    },
    password: { type: String, minlength: 8 },
    group:{ type: String,
        enum : ['HR','Normal Employee'],
        default: 'Normal Employee'}
    // isHr: { type: Boolean, default: false, required: true }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Employees', EmployeeSchema);