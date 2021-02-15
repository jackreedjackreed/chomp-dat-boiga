// Import the ORM to create functions that will interact with the database.
const orm = require('../config/orm.js');

const boiga = {
    all(cb) {
        orm.all('boigas', (res) => cb(res));
    },
    // The variables cols and vals are arrays.
    create(cols, vals, cb) {
        orm.create('boigas', cols, vals, (res) => cb(res));
    },
    update(objColVals, condition, cb) {
        orm.update('boigas', objColVals, condition, (res) => cb(res));
    },
    delete(condition, cb) {
        orm.delete('boigas', condition, (res) => cb(res));
    },

}

// / Export the database functions for the controller (boigasController.js).
module.exports = boiga;
