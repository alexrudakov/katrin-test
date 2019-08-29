const express = require('express');
const cors = require('cors');
const bankInfoRoute = require('./routes/bankInfoRoute.js');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/personal-loans', bankInfoRoute);

app.listen( process.env.PORT || 8080, () => console.log("server is running..."));