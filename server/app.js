require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path');
const compression = require('compression');
const config = require('./config')
const app = express()

// DB initialization
mongoose.connect(config.db.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


// Middlewares
if(!process.env.NODE_ENV === 'test'){
    app.use(morgan('dev'))
}

app.use(compression())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));

// Routes
app.use('/users', require('./routes/users'))
app.use('/', require('./routes/orders'))
app.use('/', require('./routes/products'))
app.use('/', require('./routes/categories'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app