const statesData = require('../models/statesData.json');

function validateStateCode(stateCode) {
    // Find the state object that matches the state code
    const state = statesData.find(s => s.code === stateCode.toUpperCase());

    // If the state object was not found, return false
    if (!state) {
        return false;
    }

    // If the state object was found, return true
    return true;
}

module.exports = validateStateCode;