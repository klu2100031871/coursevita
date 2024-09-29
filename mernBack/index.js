const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const route = require('./routers/userRouter.js');
const cors = require('cors')


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT =process.env.PORT || 7000;
const MONGOURL=process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    
    .then(()=>{
        console.log("DB Connected Successfully")
        app.listen(PORT,()=>{
            console.log(`Server is running on port :${PORT}`);
        });
    })
    .catch((error)=>console.log(error));

    app.use("/api", route);