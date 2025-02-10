require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const verifyToken = require('./middlewares/authMiddleware')


const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://acex-project.vercel.app"],
  credentials: true
}));




const adminRouter = require('./routes/adminRoutes')
app.use('/admin',adminRouter);
adminRouter.use(verifyToken);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(process.env.PORT,()=>{
    console.log(`server running on port http://localhost:${process.env.PORT}`);
    
})