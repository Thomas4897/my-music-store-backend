//! This is the file where you are going to have the logic to fetch data insert data in the database
const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    // id: { type: String, require: true, default: () => uuidv4() },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    passwordHash: { type: String, require: true },
    isAdmin: { type: Boolean, require: true, default: () => false },
})

//! The Model is the onject that is going to have the Methods/functinos to read and change the DB
const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel


