const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//! Rgister / Create user accounts
//* get credentials from client
//* Bycrypt the password
//* save the user information
//* log in the user

//! Sign-In / Authentication
//* get credentials from client
//* verify they match what is in the database

//! Authorization
//* granting the client a JWT (json web token) that they can keep
//* sothey do not have to give password and username each time

const cleanUser = (userDocument) => {
    return {
        id: userDocument.id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        isAdmin: userDocument.isAdmin,
    }
}

const getToken = (userId) => {
    //! Generate a token that he user can use to indicate that they are logged in
    //* 'iat' stands for issued at time
    const token = jwt.sign({ userId, iat: Date.now() }, process.env.JWT_SECRET_KEY);

    //! provide that token to the client
    return token;
};


//! on every request we need to check for a JWT to see if a user is signed in and if they are who they are
const register = async (req, res, next) => {

    try {
        const { firstName, lastName, email, password, isAdmin } = req.body.user

        //! Hash the password:
        const hashedPassword = await bcrypt.hash(password, 10);

        const userDocument = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            passwordHash: hashedPassword,
            isAdmin: isAdmin
        })

        userDocument.save()

        const token = getToken(userDocument._id)

        res.send({ token, user: cleanUser(foundUser) })
    } catch (error) {
        console.log('error:', error)
        res.send(error)
    }
};

// const authorize = (userId) => {
//     //! Generate a token that he user can use to indicate that they are logged in
//     //* 'iat' stands for issued at time
// const jwt = token = jwt.sign({ userId, iat: Date.now() }, process.env.JWT_SECRET_KEY);

//     //! provide that token to the client
// };

const signIn = async (req, res, next) => {

    try {
        const {
            email,
            password
        } = req.body.credentials

        const foundUser = await UserModel.findOne({ email: email })

        console.log('user:', foundUser)

        if(!foundUser) {

            return res.status(401).json({error: "User not found"})
        }

        //! If user is found check the password
        const passwordMatch = bcrypt.compare(password, foundUser.passwordHash);

        if(!passwordMatch) {
            return res.status(401).json({error: "User and Password do not match"})
        }

        const token = getToken(foundUser._id)

        res.cookie('session_token', token)

        res.send({ user: cleanUser(foundUser) })
    } catch (error) {
        console.log("error:", error)
        res.send({
            message: error.message,
            error: error,
        })

    }
};

const UserServices = { signIn, register };

module.exports = UserServices