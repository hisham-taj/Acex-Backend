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
        confirmPassword: joi.string().min(6).required(),
      });
      
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      
      const { userName, email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      
      try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
          return res.status(400).json({ message: "Email already in use" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newAdmin = new Admin({ userName, email, password: hashedPassword }); // Assigning hashed password
        await newAdmin.save();
  
        res.status(201).json({ message: 'Signup successful!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error." });
      }
    },
    postLogin: async (req, res) => {

      const schema = joi.object({
          email: joi.string().email().required(),
          password: joi.string().min(6).required(),
        });
    
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        const { email, password } = req.body;
    
        try {

          const admin = await Admin.findOne({ email });
          if (!admin) {
            return res.status(400).json({ message: "Invalid email or password" });
          }
    
          const isPasswordValid = await bcrypt.compare(password, admin.password);
          if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
          }
    
          const token = jwt.sign(
            { id: admin._id, email: admin.email, userName: admin.userName },
            process.env.JWT_SECRET || "admin-page",
            { expiresIn: "1h" }
          );
    
          res.status(200).json({ message: "Login successful", token, userName: admin.userName });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal error." });
        }
      },

      getLogin: async (req,res)=>{
        try {          
          res.render('/login');
          console.log('login page');
        } catch (error) {
          console.error(error)
        }

      },
      
    
  };
  

module.exports = adminController;
