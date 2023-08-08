const express = require('express');
const db = require('./config/connection'); 
const routes = require('./routes');
const cwd = process.cwd();



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(express.static(cwd + '/client/build'));

app.get('*', (req, res) => {
    res.sendFile(cwd + '/client/build/index.html');
});



db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
    }
);
