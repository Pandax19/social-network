const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);



// router.use((req, res,  ) => {
//     res.status(404).send('<h1>404 Error!</h1>');
// });

// const app = express();  
// app.use(router);

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log('The server is running on port 3000');
// }),

module.exports = router;




