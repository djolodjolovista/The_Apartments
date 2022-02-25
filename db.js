const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://djole:08031993@cluster0.4nntf.mongodb.net/mern-apartments'

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true})

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Mongo DB connection failed') /*Ispis ako nije uspjesna konekcija na bazu */
})

connection.on('connected', () => {
    console.log('Mongo DB connection successful') /*Ispise na konzolu ako je uspijesna konekcija na bazu */
})

module.exports = mongoose
