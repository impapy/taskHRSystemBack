const Employee = require("../models/employees.js");
const bcrypt = require('bcrypt');

// git all Employee
exports.getAllEmployeepagination = async (req, res) => {


    let query;
    let total
    try {

        if (req.body.group === "HR") {
            query = Employee.find({ group: "HR" });
            total = await Employee.countDocuments({ group: "HR" });
        } else if (req.body.group === "Normal Employee") {
            query = Employee.find({ group: "Normal Employee" });
            total = await Employee.countDocuments({ group: "Normal Employee" });
        } else {
            query = Employee.find().sort({ group: 1 });
            total = await Employee.countDocuments();
        }

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * pageSize;

        const pages = Math.ceil(total / pageSize);

        query = query.skip(skip).limit(pageSize);

        if (page > pages) {
            return res.status(404).json({
                status: "fail",
                message: "No page found",
            });
        }

        const result = await query;

        res.status(200).json({
            status: "success",
            count: result.length,
            page,
            pages,
            data: result,
        });
    } catch (error) {

        res.status(500).json({
            status: "error",
            message: "Server Error",
        });
    }

};


// Add Normal Employee

exports.AddNormalEmployee = async (req, res, next) => {
    try {

        let employee = await Employee.findOne({ UserName: req.body.UserName }).exec();
        if (employee)
            res.status(400).send('this user already exist')
        else {

            employee = new Employee({
                UserName: req.body.UserName,
                group: req.body.group
            })

             employee.save().then(data => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(user)
                res.status(401).send("the name in Used ")
            })

          

        }


    } catch (error) {
        res.status(400).send("something wrong");
    }


}

// get employee by Id

exports.GetEmployeeById = async (req, res) => {
    try {
        let employee = await Employee.findOne({ _id: req.params.id }).exec()
        if (employee) { res.status(200).send(employee) }
        else { res.status(404).send("not found"); }
    } catch (err) {
        res.status(400).send("something wrong");
    }
}

//edit employee
exports.UpdatNormalEmployee = (req, res) => {

    try {
       
        Employee.findOneAndUpdate({_id:req.params.id},
             {$set:{
                 UserName: req.body.UserName,
                group: req.body.group
            }}, {new: true},
             (err, employee) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }else{
                res.status(200).send(employee)
            }
        
        });

    } catch (error) {
        res.status(400).send("something wrong");
    }


}
exports.ChangeEmployeeToHr = async (req, res) => {
    try {
        let hashpassword = await bcrypt.hash(req.body.password, 10)
        Employee.findOneAndUpdate({_id:req.params.id},
             {$set:{
                 UserName: req.body.UserName,
                group: req.body.group,
                password: req.body.password
            }}, {new: true},
             (err, employee) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }else{
                res.status(200).send(employee)
            }
        
        });

    } catch (error) {
        res.status(400).send("something wrong");
    }
}

exports.ChangeEmployeePasswordHr = async (req, res) => {
    try {
        let hashpassword = await bcrypt.hash(req.body.password, 10)
        Employee.findOneAndUpdate({_id:req.params.id},
             {$set:{
                password: req.body.password
            }}, {new: true},
             (err, employee) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }else{
                res.status(200).send(employee)
            }
        
        });

    } catch (error) {
        res.status(400).send("something wrong");
    }
}

//delete employee
exports.DeleteEmployee=async (req,res)=>{
    try {
        await Employee.findByIdAndDelete(req.params.id).then(data => {
            
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send(err);
        })

    } catch (error) {
        res.status(400).send( "something wrong");
    }

}

//get all employee
exports.getAllEmployee = (req, res) => {
    Employee.find({}).then((employee) => {

        res.send({ success: true, Employee: employee, NumberOfEmployee: employee.length })

    })
        .catch(err => res.status(400).send(err))
};