require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger, logEvents } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
    res.status(404);

    return req.accepts('json') 
        ? res.json({ "error": "404 Not Found" }) 
        : res.type('txt').send("404 Not Found");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});