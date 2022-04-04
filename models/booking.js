const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({

    room : {
        type: String,
        required: true
    },
    roomcity : {
        type: String,
        required: true
    },
    roomid : {
        type: String,
        required: true
    },
    userid : {
        type: String,
        required: true
    },
    fromdate : {
        type: String, //jer koristimo momente za datum pa moze kao string
        required: true
    },
    todate : {
        type: String,
        required: true
    },
    totalamount : {
        type: Number,
        required: true
    },
    totaldays : {
        type: Number,
        required: true
    },
    transactionId : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true,
        default: 'booked'
    }
},
{
timestamps: true,
})

const bookingmodel = mongoose.model('booking', bookingSchema); //booking je naziv kolekcije
module.exports = bookingmodel;