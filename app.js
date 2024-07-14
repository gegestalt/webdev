const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const db = require('./data/database');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

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
