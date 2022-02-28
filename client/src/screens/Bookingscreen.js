import React, { useState, useEffect } from 'react';
import axios from "axios";



function Bookingscreen({ match }) {
const [loading, setloading] = useState(); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
const [error, seterror] = useState();
const [room, setroom] = useState();

useEffect(() => {
  async function fetchData() {
    try {
      setloading(true); /**API request je pokrenut */
      const data = (await axios.post("/api/rooms/getroombyid", {roomid: match.params.roomid})).data;

      setroom(data);
      setloading(false); /**API request je zavrsen */
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }
  fetchData();
}, []);
  return (
    <div>
      <h1>Booking screen</h1>
      <p>Room id= {match.params.roomid}</p>
    </div>
  );
}

export default Bookingscreen;
