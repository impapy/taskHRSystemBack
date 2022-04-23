const verify = require("../controller/verifyTokenapi.controller.js");
const router = require("express").Router();
const attendance = require("../controller/attendance.controller");

//get attendance day
router.post("/",verify.verifyTokenAndAdmin,attendance.GetDay);
//create attendance
router.post("/NewDay",verify.verifyTokenAndAdmin,attendance.AddAttendance);
//attendanec for employee
router.put("/EmployeeAtt/:idE",verify.verifyTokenAndAdmin,attendance.EmployeeAttendance);

module.exports = router;