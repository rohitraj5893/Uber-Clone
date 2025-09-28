const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/database');
const userRoutes = require('./routes/user-routes');

connectToDB();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use('/users',userRoutes);
app.get('/',(req,res) => {
    res.send('Hello World')
})

module.exports = app;
