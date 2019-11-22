const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const productRoute = require('./routes/products')

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => { console.log('connect to db!') });

    
app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/products',productRoute)

app.listen(3000, console.log(`Server started`));