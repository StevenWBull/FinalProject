const State = require('../models/State');
const validateStateCode = require("../middleware/validateStateCode");
const send404 = require("../middleware/send404");
const statesData = require('../models/statesData.json');

const verifyStateCode = async (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    return isValidStateCode ? next() : send404(req, res);
};

/* 
    params: stateData - an array of state objects
*/
const addFunFacts = async (stateData) => {
    const stateDataWithFunFacts = stateData.map(async s => {
        const stateDBData = await State.findOne({ stateCode: s.code }, 'funfacts');
        const funfacts = stateDBData?.funfacts ? stateDBData.funfacts : [];
        return { ...s, funfacts };
    });

    return await Promise.all(stateDataWithFunFacts);
};

const getAllStates = async (req, res, next) => {
    const isContiguous = req.query.contig;

    if (isContiguous === undefined) {
        // Return a list of all states
        const stateDataWithFunFacts = await addFunFacts(statesData);
        res.json(stateDataWithFunFacts);
    } else
        next();
};

const getStatesByContiguity = async (req, res) => {
    const isContiguous = req.query.contig === "true";

    const stateData = statesData.filter(s => isContiguous 
        ? !['AK', 'HI'].includes(s.code) 
        : ['AK', 'HI'].includes(s.code)
    );

    // Return a list of contiguous or non-contiguous states
    const stateDataWithFunFacts = await addFunFacts(stateData);
    res.json(stateDataWithFunFacts);
};

const getStateInfo = async (req, res) => {
    const stateCode = req.params.state;

    // Return information about the specified state
    const stateData = statesData.filter(s => s.code === stateCode.toUpperCase());
    const stateDataWithFunFacts = (await addFunFacts(stateData))[0];
    res.json(stateDataWithFunFacts);
};

const getFunFact = async (req, res) => {
    const stateCode = req.params.state;
    const stateDBData = await State.findOne({ stateCode: stateCode.toUpperCase() }, 'funfacts');
    const funfactsArr = stateDBData?.funfacts ? stateDBData.funfacts : [];
    const randomIndex = Math.floor(Math.random() * funfactsArr.length);

    // Return a fun fact about the specified state
    res.json(
        funfactsArr.length 
        ? { funfact: funfactsArr[randomIndex]} 
        : {}
    );
};

const getCapital = async (req, res) => {
    const stateCode = req.params.state;

    const stateData = statesData.find(s => s.code === stateCode.toUpperCase());
    const stateCapital = {
        state: stateData.state,
        capital: stateData.capital_city
    };

    // Return the capital of the specified state
    res.json(stateCapital);
};

const getNickname = async (req, res) => {
    const stateCode = req.params.state;

    const stateData = statesData.find(s => s.code === stateCode.toUpperCase());
    const stateNickname = {
        state: stateData.state,
        nickname: stateData.nickname
    };

    // Return the nickname of the specified state
    res.json(stateNickname);
};

const getPopulation = async (req, res) => {
    const stateCode = req.params.state;

    const stateData = statesData.find(s => s.code === stateCode.toUpperCase());
    const statePopulation = {
        state: stateData.state,
        population: stateData.population.toLocaleString()
    };

    // Return the population of the specified state
    res.json(statePopulation);
};

const getAdmissionDate = async (req, res) => {
    const stateCode = req.params.state;

    const stateData = statesData.find(s => s.code === stateCode.toUpperCase());
    const stateAdmission = {
        state: stateData.state,
        admitted: stateData.admission_date
    };

    // Return the date of admission to the Union for the specified state
    res.json(stateAdmission);
};

const postFunFact = async (req, res) => {
    res.json({ message: "POST /states/:state/funfact" });
};

const patchFunFact = async (req, res) => {
    res.json({ message: "PATCH /states/:state/funfact" });
};

const deleteFunFact = async (req, res) => {
    res.json({ message: "DELETE /states/:state/funfact" });
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