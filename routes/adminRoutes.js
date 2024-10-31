const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter
    .post('/signup',adminController.postSignup)
    .post('/login',adminController.postLogin)

module.exports = adminRouter;