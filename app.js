const express = require('express');
const app = express();
require('dotenv').config()
// const logger = require('./middlewares/logger');
// const {notFound,errorHanlder} = require('./middlewares/erorrs');
const connectToDB = require('./config/db');

// app.use(logger);
// app.set("view engine", "ejs")
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
const Joi = require('joi');

connectToDB()

//routes
app.use("/api/auth" , require('./routes/auth'))
app.use("/api/users" , require('./routes/users'))
app.use("/api/posts" , require('./routes/posts'))


 // Error Hanlder Middleware
//  app.use(notFound);
//  app.use(errorHanlder);
  

const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`));


// making model