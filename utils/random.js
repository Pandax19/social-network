const express = require('express');
const data = require('./data');
const seed = require('./seed');
const path = require('path');

router.use('/api', apiRoutes);




router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
}
);





module.exports = router;

