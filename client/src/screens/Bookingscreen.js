import React, { useState, useEffect } from 'react';
import axios from "axios"; /**axios je biblioteka koja sluzi za kreiranje http zahtjeva */



function Bookingscreen({ match }) {
const [loading, setloading] = useState(true); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
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
    <div className='m-5'>
      
      {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) : (<div>

        <div className='row justify-content-center mt-5 bs'>

          <div className='col-md-6'>
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} alt='' className='bigimg img-fluid' />
          </div>

          <div className="col-md-6">
              <div style={{textAlign: 'right'}}>
              <h1>Booking Details</h1>
              <hr />

              <b>
              <p>Name : </p>
              <p>From Date : </p>
              <p>To Date : </p>
              <p>Max Count : {room.maxcount}</p>
              </b>
              </div>


              <div style={{textAlign: 'right'}}>
                <b>
                <h1>Amount</h1>
                <hr />
                <p>Total days : </p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount : </p>
                </b>
              </div>

              <div style={{float: 'right'}}>
                <button className='btn btn-primary'>Pay Now</button>
              </div>


          </div>

        </div>

      </div>)}

    </div>
  );
}

export default Bookingscreen;
