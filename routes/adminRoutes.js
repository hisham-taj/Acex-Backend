const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter
    .post('/signup',adminController.postSignup)

module.exports = adminRouter;