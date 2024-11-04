const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');


adminRouter
    .post('/signup',adminController.postSignup)
    .post('/login',adminController.postLogin)

    .get('/login',adminController.getLogin)


module.exports = adminRouter;