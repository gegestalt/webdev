const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth.routes');

app.use(authRoutes);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.listen(3000);