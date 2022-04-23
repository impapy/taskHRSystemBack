const verify = require("../controller/verifyTokenapi.controller.js");
const router = require("express").Router();
const employees = require("../controller/Employees.controller");
const validNE = require('../middlewares/NEMWValidaror.js');

//get all employee
router.get("/", verify.verifyTokenAndAdmin,employees.getAllEmployee);
// git all Employee pagination
router.post("/pagination", verify.verifyTokenAndAdmin,employees.getAllEmployeepagination);
// Add Normal Employee
router.post("/AddNEmployee", verify.verifyTokenAndAdmin,validNE,employees.AddNormalEmployee);
// get employee by Id
router.get("/:id", verify.verifyTokenAndAdmin,employees.GetEmployeeById);
//edit employee
router.put("/:id",verify.verifyTokenAndAdmin,employees.UpdatNormalEmployee);
//delete employee
router.delete("/:id",verify.verifyTokenAndAdmin,employees.DeleteEmployee);

module.exports = router;