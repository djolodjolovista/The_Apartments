//backend poziv za booking room
const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room")

router.post('/bookroom', async(req, res) => { //bookroom to je endpoint

    const {//pa cemo da primimo data sa frontend-a, izvrsili smo destructuring
    room, 
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays
    } = req.body;

    try {
        const newbooking = new Booking({ //prvo kreiramo novi model i tu pisemo podatke koje cemo smjestiti u bazu
            room: room.name,
            roomid: room._id,
            userid, //userid,fromdate, todate... ostaje isti pa ne moramo pisati
            fromdate: moment(fromdate).format('DD-MM-YYYY'),//morali smo prvo instalirati 'npm i moment' na backend
            todate: moment(todate).format('DD-MM-YYYY'),
            totalamount,
            totaldays,
            transactionId: '1234' //dodijeli smo staticni jer ne koristimo sad stripe za placanje, valjda da bi mogli testirati

        })

        const booking = await newbooking.save(); //da sacuva u bazu

        //moramo azurirati odg sobu da znamo za koje datume je rezervisana
        const roomtemp = await Room.findOne({_id: room._id})
        roomtemp.currentbookings.push({bookingid: booking._id, fromdate: moment(fromdate).format('DD-MM-YYYY'), 
        todate: moment(todate).format('DD-MM-YYYY'), userid: userid, status: booking.status}); 

        await roomtemp.save();

        res.send('Room Booked Successfully'); //response sa backend-a
    } catch (error) {
        return res.status(400).json({ error});
    }

});

module.exports = router;
//sad treba booking rutu upisati u server.js
