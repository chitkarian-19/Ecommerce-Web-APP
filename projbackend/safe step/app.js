require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
//DB Connections
mongoose.connect(process.env.DATABASE,
{    useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex: true}).then(() =>{
         console.log('DB CONNECTED');
     }
);

//MiddleWares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MyRoutes
app.use("/api",authRoutes);
   //Anny route you make , you need to prefix /api/ before writing api name  


//PORT
const port=process.env.PORT || 8000;
//Starting a server
app.listen(port, () =>{
    console.log(`app is running at ${port}`);
});