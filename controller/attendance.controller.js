const Attendance = require("../models/attendance.js");
const Employee = require("../models/employees.js");

//create attendance
exports.AddAttendance = async (req, res, next) => {
    try {

        let attendance = await Attendance.findOne({ day: req.body.day }).populate("Employees.EmployeeId",{
            UserName:1,group:1}).exec()
        if (attendance)
        res.status(200).send(attendance)
        else {

            let employee=await Employee.find({},{_id:1})

            employee= await employee.map(({ _id: EmployeeId }) => ({ EmployeeId ,IsAttendance:false}));
        
            attendance = new Attendance({
                day: req.body.day,
                Employees:employee
            })

            attendance.save().then(data => {
                res.status(200).send(data)
            }).catch(err => {
                res.status(401).send("the date in Used ")
            })

          

        }


    } catch (error) {
        res.status(400).send("something wrong");
    }


}


//get attendance day
exports.GetDay = async (req, res) => {
    try {
        let attendance = await Attendance.findOne({ day: req.body.day }).populate("Employees.EmployeeId",{
            UserName:1,group:1}).exec()
        
        if (attendance) { res.status(200).send(attendance) }
        else { res.status(404).send("not found"); }
    } catch (err) {
        res.status(400).send("something wrong");
    }
}

//attendanec for employee
exports.EmployeeAttendance =  (req, res) => {
    Attendance.findOneAndUpdate( { day: req.body.day, "Employees.EmployeeId": req.params.idE }, {
        $set: {  "Employees.$.IsAttendance" : true  }
    },
        {
            new: true
        }, (err, attendance) => {
            if (err) res.status(403).send("something erroe");
            res.send(attendance);
        })
}