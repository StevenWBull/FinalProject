require('dotenv').config();
const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger, logEvents } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const validateStateCode = require('./middleware/validateStateCode');

const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

app.use('/', require('./routes/root'));
app.use('/states', require('./routes/states'));

app.all('*', (req, res) => {
    res.status(404);

    return req.accepts('html')
        ? res.sendFile(path.join(__dirname, 'views', '404.html'))
        : req.accepts('json') 
            ? res.json({ "error": "404 Not Found" }) 
            : res.type('txt').send("404 Not Found");
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    logEvents('Connected to MongoDB', 'dbAccessLog.txt');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});