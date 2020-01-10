require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path');
const compression = require('compression');
const config = require('./config')
const app = express()
const cors = require('cors');


mongoose.connect(config.db.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Middlewares
if(!process.env.NODE_ENV === 'test'){
    app.use(morgan('dev'))
}

app.use(cors())
app.use(compression())
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'build')));

// Routes
app.use('/users', require('./routes/users'))
app.use('/', require('./routes/products'))


// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

module.exports = app
