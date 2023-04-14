const mongoose = require('mongoose');
const logEvents = require('../middleware/logEvents');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        logEvents(`${err.name}: ${err.message}`, 'dbErrorLog.txt');
    }
}

module.exports = connectDB;