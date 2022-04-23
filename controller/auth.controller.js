const Employee = require("../models/employees");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//SIGN UP 
exports.signUp = async (req, res, next) => {

    try {

        let user = await Employee.findOne({ UserName: req.body.UserName }).exec();
        if (user)
            res.status(400).send('this user already exist')
        else {

            let hashpassword = await bcrypt.hash(req.body.password, 10)
            user = new Employee({
                UserName: req.body.UserName,
                password: hashpassword,
                group: req.body.group
            })

            await user.save()

            res.status(200).send( "welcome  you are regitered successfully" )

        }


    } catch (error) {
        res.status(400).send( "something wrong" );
    }


}


//login Hr

exports.login = async (req, res) => {
    try {

        let user = await Employee.findOne({ UserName: req.body.UserName }).exec();
        if (!user)
            return res.status(400).send('Invalid Email or password')

        const validpassword = await bcrypt.compare(req.body.password, user.password)
        if (!validpassword)
            return res.status(400).send('Invalid Email or password')


        if (user.group == "HR"){
        const userToken = jwt.sign({ id: user._id, isHR:true, name: user.UserName }, process.env.JWT_SEC, { expiresIn: "3d" });
        jwt.verify(userToken, process.env.JWT_SEC, (err, userData) => {
            if (userData) {
                return res.status(200).send({ sucess: true, token: userToken, user:user });
            }
        })
           
    }
       else{
        res.status(400).send('your not HR')
       }
        
    } catch (error) {
        res.status(400).send( "something wrong" );
    }
};
