/**U fajlu roomsRoute definisemo api endpoints, update room,delete room itd */
const express = require("express");
const router = express.Router();

const Room = require('../models/room')


router.get('/getallrooms', async(req, res) => {

    try {
        const rooms = await Room.find({}) /*Room je model koji smo kreirali u models*/
    /**Mogu se desiti error-i zato cemo staviti u try catch blok */
    res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

module.exports = router; /**Moramo ga exportovati jer cemo ga koristiti u server.js koji je entry-point nase node aplikacije */