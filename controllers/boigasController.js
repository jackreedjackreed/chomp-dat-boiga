const express = require('express');

const router = express.Router();

// Import the model (boiga.js) to use its database fxns.
const boiga = require('../models/boiga.js');

// Create all our routes and set up logic within those routes where required
router.get('/', (req, res) => {
    boiga.all((data) => {
        const hbsObject = {
            boigas: data,
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/boigas', (req,res) => {
    boiga.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
            // after creating a burger, return the id of that burger
    });
});

router.put('/api/boigas/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;

    console.log('condition', condition);

    boiga.update(
        {
            devoured: req.body.devoured,  // set the devoured boolean to whatever the user supplies
                                        // devoured value corresponds to the column value in the orm
        },
        condition, // CONDITION (see orm) is the id, named as a const above
        (result) => {
            if (result.changedRows === 0) {
                // if no rows were changed, then the ID must not exist --> throw 404
                return res.status(404).end()
            }
            res.status(200).end();
        }
    );
});

router.delete('/api/boigas/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;

    boiga.delete(condition, (result) => {
        if (result.affectedRows === 0) {
            // if no rows were changed, then ID  must not exist --> throw 404
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// Export routes for server.js to use
module.exports = router;

