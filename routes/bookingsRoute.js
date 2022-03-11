//backend poziv za booking room
const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
const stripe = require("stripe")(
  "sk_test_51KbXOeB42lm3IJrhyxBHtJdogQYbrx8C3kTwtsfvc6PtT90DHdf1IkJfIrf2AerrH943WuswYMUHvz2Z925ziENK00iGQk2AMV"
);
//ovo iznad pored "stripe" je secret key
const { v4: uuidv4 } = require("uuid"); //uuid cemo koristiti za generisanje transaction id
router.post("/bookroom", async (req, res) => {
  //bookroom to je endpoint

  const {
    //pa cemo da primimo data sa frontend-a, izvrsili smo destructuring
    room,
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays,
    token, //token sa frontend-a
  } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      //moramo proslijediti paremetre za naplacivanje
      {
        //u ovom objektu pisemo detalje u drugom objektu ide transaction id
        //moramo ovako pisati jer je tako def u stripe dokumentaciji
        amount: totalamount * 100,
        customer: customer.id,
        currency: "EUR",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(), //idempotencyKey generisacemo jedinstven id svaki put pomocu uuidv4() da se klijentu ne moze naplatiti dva puta
      }
    );

    if (payment) {
      //bez obzira sto je u try catch bloku pisemo 'if', tj ako je payment successfull da moze izvrsiti booking
      
        const newbooking = new Booking({
          //prvo kreiramo novi model i tu pisemo podatke koje cemo smjestiti u bazu
          room: room.name,
          roomid: room._id,
          userid, //userid,fromdate, todate... ostaje isti pa ne moramo pisati
          fromdate: moment(fromdate).format("DD-MM-YYYY"), //morali smo prvo instalirati 'npm i moment' na backend
          todate: moment(todate).format("DD-MM-YYYY"),
          totalamount,
          totaldays,
          transactionId: "1234", //dodijeli smo staticni jer ne koristimo sad stripe za placanje, valjda da bi mogli testirati
        });

        const booking = await newbooking.save(); //da sacuva u bazu

        //moramo azurirati odg sobu da znamo za koje datume je rezervisana
        const roomtemp = await Room.findOne({ _id: room._id });
        roomtemp.currentbookings.push({
          bookingid: booking._id,
          fromdate: moment(fromdate).format("DD-MM-YYYY"),
          todate: moment(todate).format("DD-MM-YYYY"),
          userid: userid,
          status: booking.status,
        });

        await roomtemp.save();

       
     
    }
    res.send("Payment Successfull, Your Room is booked");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post('/getbookingsbyuserid', async(req, res) => {

  const userid = req.body.userid


  try {
    const bookings = await Booking.find({userid : userid})//userid bude jednak userid
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ error });
  }

});

module.exports = router;
//sad treba booking rutu upisati u server.js
