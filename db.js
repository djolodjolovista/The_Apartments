const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://djole:<password>@cluster0.4nntf.mongodb.net/mern-apartments'

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true})

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Mongo DB connection failed')
})

connection.on('connected', () => {
    console.log('Mongo DB connection successful')
})

module.exports = mongoose
