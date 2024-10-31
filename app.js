require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));




const adminRouter = require('./routes/adminRoutes')
app.use('/admin',adminRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(process.env.port,()=>{
    console.log(`server running on port http://localhost:${process.env.port}`);
    
})