const State = require('../models/State');
const validateStateCode = require("../middleware/validateStateCode");

const getAllStates = async (req, res, next) => {
    const isContiguous = req.query.contig;

    if (isContiguous === undefined)
        // Return a list of all states
        res.send(`${isContiguous}`);
    else
        next();
};

const getStatesByContiguity = async (req, res) => {
    const isContiguous = req.query.contig === "true";

    // Return a list of contiguous or non-contiguous states
    res.send(`List of ${isContiguous ? "contiguous" : "non-contiguous"} states`);
};

const getStateInfo = async (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return information about the specified state
        res.send(`Information about ${stateCode}`);
    } else {
        next();
    }
};

const getFunFact = async (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return a fun fact about the specified state
        res.send(`Fun fact about ${stateCode}`);
    } else {
        next();
    }
};

const getCapital = async (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return the capital of the specified state
        res.send(`Capital of ${stateCode}`);
    } else {
        next();
    }
};

const getNickname = async (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return the nickname of the specified state
        res.send(`Nickname of ${stateCode}`);
    } else {
        next();
    }
};

const getPopulation = async (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return the population of the specified state
        res.send(`Population of ${stateCode}`);
    } else {
        next();
    }
};

const getAdmissionDate = async (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return the date of admission to the Union for the specified state
        res.send(`Admission date of ${stateCode}`);
    } else {
        next();
    }
};

module.exports = {
    getAllStates,
    getStatesByContiguity,
    getStateInfo,
    getFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmissionDate
};