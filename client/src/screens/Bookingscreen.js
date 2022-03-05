import React, { useState, useEffect } from 'react';
import axios from "axios"; /**axios je biblioteka koja sluzi za kreiranje http zahtjeva */
import Loader from '../components/Loader';/**importovali smo komponentu Loader da bi je mogli koristiti */
import Error from '../components/Error';
import moment from 'moment';



function Bookingscreen({ match }) {
const [loading, setloading] = useState(true); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
const [error, seterror] = useState();
const [room, setroom] = useState();

const roomid = match.params.roomid;
const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY');//moramo formatirati u moment formatu da bi mogli kasnije primjenjivati moment f-je
const todate = moment(match.params.todate, 'DD-MM-YYYY');

const totaldays = moment.duration(todate.diff(fromdate)).asDays()+1//izracunava ukupan broj dana, diff razlika izmedju todate i fromdate

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

useEffect(() => {
  fetchData();
}, []);
/**Prvo provjeravamo loading pa onda room pa ako nista od toga nije true onda tek nek izbaci error ! */
  return (
    <div className='m-5'>
      
      {loading ? (<Loader />) : room ? (<div>

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
              <p>From Date : {match.params.fromdate} </p>
              <p>To Date : {match.params.todate} </p>
              <p>Max Count : {room.maxcount}</p>
              </b>
              </div>


              <div style={{textAlign: 'right'}}>
                <b>
                <h1>Amount</h1>
                <hr />
                <p>Total days : {totaldays} </p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount : </p>
                </b>
              </div>

              <div style={{float: 'right'}}>
                <button className='btn btn-primary'>Pay Now</button>
              </div>


          </div>

        </div>

      </div>) : (<Error />)}

    </div>
  );
}

export default Bookingscreen;
