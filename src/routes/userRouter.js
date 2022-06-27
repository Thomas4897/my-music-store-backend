const express = require('express');
const UserServices  = require('../services/UserService');


const userRouter = express.Router();

userRouter.post('/sign-in', async (req, res, next) => {
   
    return UserServices.signIn(req, res, next)
});

userRouter.post('/register', async (req, res, next) => {
   
    return UserServices.register(req, res, next)
});


module.exports = userRouter;