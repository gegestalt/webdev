const express = require('express');
const csrf = require('csurf');
const path = require('path');

const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const authRoutes = require('./routes/auth.routes');
const handleErrors = require('./middlewares/error-handling');
const db = require('./data/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(csrf()); // Activate as middleware 
app.use(addCsrfTokenMiddleware); // Use own middleware to add csrf token to response

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use(authRoutes);

// Error-handling middleware should be the last middleware
app.use(handleErrors);

db.connectToDatabase()
    .then(function () {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(function (error) {
        console.log(error);
        console.log('Unable to connect to database');
    });
