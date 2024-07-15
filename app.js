const express = require('express');
const path = require('path');
const csrf = require('csurf');
const addCsrfToken = require('./middlewares/csrf-token');
const checkAuthStatus = require('./middlewares/check-auth');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');



const handleErrors = require('./middlewares/error-handler');
const expressSession = require('express-session');
const db = require('./data/database');
const createSessionConfig = require('./config/session');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession(createSessionConfig()));
app.use(csrf());
app.use(addCsrfToken);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(baseRoutes)
app.use(authRoutes);
app.use(productRoutes);
app.use(handleErrors);

db.connectToDatabase()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => {
        console.error('Unable to connect to database:', error);
    });
