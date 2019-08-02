const express    = require('express')
const bodyParser = require('body-parser')
const morgan     = require('morgan')
const mongoose   = require('mongoose')
require('dotenv').config();

// DB initialization
const { db } = require('./config')
let mongoURI;

if(process.env.NODE_ENV === 'test'){
    mongoURI = `mongodb+srv://AtlasAdmin:${db.DB_PW}@cluster0-3qsgw.mongodb.net/${db.DB_NAME_TEST}?retryWrites=true`;
}else{
    mongoURI = `mongodb+srv://AtlasAdmin:${db.DB_PW}@cluster0-3qsgw.mongodb.net/${db.DB_NAME}?retryWrites=true`;
}

mongoose.connect(mongoURI, {
    useCreateIndex: true, // collection.ensureIndex is deprecated. Use createIndexes instead
    useNewUrlParser: true
})

const app = express()

// Middlewares
if(!process.env.NODE_ENV === 'test'){
    app.use(morgan('dev'))
}

app.use(bodyParser.json())

// Routes
app.use('/users', require('./routes/users'))
app.use('/', require('./routes/orders'))
app.use('/', require('./routes/products'))

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app
