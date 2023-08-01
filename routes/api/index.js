const router = require('express').Router();
const apiRoutes = require('../api');
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');


router.use('/api', apiRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;




