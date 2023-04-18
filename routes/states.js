const express = require("express");
const stateRouter = express.Router();
const path = require("path");
const validateStateCode = require("../middleware/validateStateCode");

// Route for /states/
stateRouter.get("/", (req, res) => {
    // Return a list of all states
    res.send("List of all states");
});

// Route for /states/?contig=true
stateRouter.get("/", (req, res) => {
    const isContiguous = req.query.contig === "true";

    // Return a list of contiguous or non-contiguous states
    res.send(`List of ${isContiguous ? "contiguous" : "non-contiguous"} states`);
});

// Route for /states/:state
stateRouter.get("/:state", (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return information about the specified state
        res.send(`Information about ${stateCode}`);
    } else {
        next();
    }
});

// Route for /states/:state/funfact
stateRouter.get("/:state/funfact", (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return a fun fact about the specified state
        res.send(`Fun fact about ${stateCode}`);
    } else {
        next();
    }
});

// Route for /states/:state/capital
stateRouter.get("/:state/capital", (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return the capital of the specified state
        res.send(`Capital of ${stateCode}`);
    } else {
        next();
    }
});

// Route for /states/:state/nickname
stateRouter.get("/:state/nickname", (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return the nickname of the specified state
        res.send(`Nickname of ${stateCode}`);
    } else {
        next();
    }
});

// Route for /states/:state/population
stateRouter.get("/:state/population", (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return the population of the specified state
        res.send(`Population of ${stateCode}`);
    } else {
        next();
    }
});

// Route for /states/:state/admission
stateRouter.get("/:state/admission", (req, res, next) => {
    const stateCode = req.params.state;
    const isValidStateCode = validateStateCode(stateCode);

    if (isValidStateCode) {
        // Return the date of admission to the Union for the specified state
        res.send(`Admission date of ${stateCode}`);
    } else {
        next();
    }
});

module.exports = stateRouter;
