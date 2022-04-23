const express = require('express');
const router = express.Router();
// const users = require("../controller/auth.controller.js");
const verfiy =require("../controller/verifyTokenapi.controller.js");
const employee = require('../controller/auth.controller.js');
const validsignup = require('../middlewares/HRMWValidaror.js');
const validlogin = require('../middlewares/AuthMWValidaror');

//SIGN UP
router.post('/signup',validsignup, employee.signUp);
//LOGIN
router.post('/login',validlogin, employee.login);


module.exports = router;