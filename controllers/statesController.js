const State = require('../models/State');
const validateStateCode = require("../middleware/validateStateCode");
const send404 = require("../middleware/send404");

const verifyStateCode = async (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    return isValidStateCode ? next() : send404(req, res);
};

const getAllStates = async (req, res, next) => {
    const isContiguous = req.query.contig;

    if (isContiguous === undefined)
        // Return a list of all states
        res.send(`List of all states`);
    else
        next();
};

const getStatesByContiguity = async (req, res) => {
    const isContiguous = req.query.contig === "true";

    // Return a list of contiguous or non-contiguous states
    res.send(`List of ${isContiguous ? "contiguous" : "non-contiguous"} states`);
};

const getStateInfo = async (req, res) => {
    const stateCode = req.params.state;

    // Return information about the specified state
    res.send(`Information about ${stateCode}`);
};

const getFunFact = async (req, res) => {
    const stateCode = req.params.state;

    // Return a fun fact about the specified state
    res.send(`Fun fact about ${stateCode}`);
};

const getCapital = async (req, res) => {
    const stateCode = req.params.state;

    // Return the capital of the specified state
    res.send(`Capital of ${stateCode}`);
};

const getNickname = async (req, res) => {
    const stateCode = req.params.state;

    // Return the nickname of the specified state
    res.send(`Nickname of ${stateCode}`);
};

const getPopulation = async (req, res) => {
    const stateCode = req.params.state;

    // Return the population of the specified state
    res.send(`Population of ${stateCode}`);
};

const getAdmissionDate = async (req, res) => {
    const stateCode = req.params.state;

    // Return the date of admission to the Union for the specified state
    res.send(`Admission date of ${stateCode}`);
};

module.exports = {
    verifyStateCode,
    getAllStates,
    getStatesByContiguity,
    getStateInfo,
    getFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmissionDate
};