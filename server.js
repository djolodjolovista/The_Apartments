const express = require("express");


const app = express();

const dbConfig = require('./db');
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const path = require('path');

app.use(express.json())
//app.use()- f-ja koja ubacuje novi middleware u app
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)//api req dolazi sa ovim url provjeravajuci usersRoute
//ruta ce odgovarati bilo kojoj putanji koja odmah prati njenu putanju sa "/"
//npr. app.use('/apple',...) ce odgovarati '/apple' , '/apple/images', '/apple/images/news' itd
app.use('/api/bookings', bookingsRoute)

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port using nodemon`));

