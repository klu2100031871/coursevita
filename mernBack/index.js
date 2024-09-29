const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require('./routers/userRouter.js');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 8000;
const MONGOURL = 'mongodb+srv://klu-2100031871:Mohan%402004@cluster0.3vgvf63.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("DB Connected Successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use("/api", route);
