require('dotenv').config()
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const productRouter = require('./routes/productRouter');

const app = express()
const port = 3017;

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
.then(() => console.log("Connected to mongo db successfully"))
.catch(() => console.log("Unable to connect to mongo db successfully"))

mongoose.set('debug', true);

//! Parsing cookies
app.use((req, res, next) => {
    console.log("Parsing all of your cookies from their native format to a developer friendly format so that we can")
    next();
});

app.use(cors());

//! Parsing JSON data
app.use((req, res, next) => {
    console.log("Parse request into json so that we can work with them")
    next();
});

//! Authorization 
app.use((req, res, next) => {
    console.log("userAuthorization middleware")
    next();
});

app.use(productRouter)

//! ===================================

app.get('/', function (req, res) {
    console.log("Hello From Home Route")
  res.send('Hello World')
})

app.get('/createUser', function (req, res) {
    console.log("Hello From the /createUser Route")
  res.send('Hello World')
})

app.get('/getProducts', function (req, res) {
    console.log("Hello From the /getProducts Route")
  res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Our backend is listening on port ${port}`)
})