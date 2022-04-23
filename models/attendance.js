const mongoose = require('mongoose');


const AttendanceSchema = new mongoose.Schema({
    day: { type: Date,format: "%Y-%m-%d", required: true ,unique: true},
    Employees: [{ 
        EmployeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employees"
          },
        IsAttendance: { type: Boolean, default: false, required: true }
     }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('attendance', AttendanceSchema);