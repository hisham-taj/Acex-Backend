const joi = require("joi");
const Admin = require("../model/adminSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminController = {
  postSignup: async (req, res) => {
    console.log("hi from postsignup");
    console.log(req.body);

    const schema = joi.object({
      userName: joi.string().min(3).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }

    try {
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message: "Email already in use"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ userName, email, password, hashedPassword});
        await newAdmin.save();

        res.status(201).json({ message: 'Signup succesfull!'});
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "internal error."})
    }
  },
};

module.exports = adminController;
