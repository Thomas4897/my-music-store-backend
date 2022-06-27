require('dotenv').config()
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const productRouter = require('./routes/productRouter');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const AuthorizationService = require('./services/AuthorizationService');
const cookieParser = require('cookie-parser')

const app = express()
const port = 3017;

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
.then(() => console.log("Connected to mongo db successfully"))
.catch(() => console.log("Unable to connect to mongo db successfully"))

mongoose.set('debug', true);

//! Parsing cookies
app.use(cookieParser());

app.use(cors());

//! Parsing JSON data
app.use(bodyParser.json())
// app.use((req, res, next) => {
//     console.log("Parse request into json so that we can work with them")

//     next();
// });

//! Authorization 
app.use(AuthorizationService.checkAuth);

app.use(userRouter);
app.use(productRouter);

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