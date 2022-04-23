const express = require('express');
const app = express();
require("./DB");
const authRoute = require('./routes/auth.routes');
const employees = require('./routes/employees.routes');
const attendance = require('./routes/attendance.route');

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/employee", employees);
app.use("/api/attendance", attendance);


app.listen(process.env.PORT || 5000, () => {
    console.log(`server listen on ${process.env.PORT}`)
})