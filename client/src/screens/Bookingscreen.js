import React, { useState, useEffect } from "react";
import axios from "axios"; /**axios je biblioteka koja sluzi za kreiranje http zahtjeva */
import Loader from "../components/Loader"; /**importovali smo komponentu Loader da bi je mogli koristiti */
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import AOS from 'aos';
import 'aos/dist/aos.css'; //aos google pa github za css
import './BookingScreen.css';


// ..
AOS.init({
    duration: 1000 //trajanje animacije u ms
});

function Bookingscreen({ match }) {
  const [loading, setLoading] =
    useState(
      true
    ); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY"); //moramo formatirati u moment formatu da bi mogli kasnije primjenjivati moment f-je
  const todate = moment(match.params.todate, "DD-MM-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate, 'days')) + 1; //izracunava ukupan broj dana, diff razlika izmedju todate i fromdate
  const [totalamount, setTotalamount] = useState();
 
  async function fetchData() {
    const test = JSON.parse(localStorage.getItem('currentUser'))
    
    if(test === null)//ako user nije ulogovan da ga prebaci na logovanje jer i u booking screen-u se prikazuje ulogovani korisnik
    {
      
      window.location.href='/login'
    }
   
    try {
    
      setLoading(true); /**API request je pokrenut */
      const data = (
        await axios.post("/api/rooms/getroombyid", {
          roomid: match.params.roomid,
        })
      ).data;

      setRoom(data);
      setTotalamount(totaldays * data.rentperday);
      setLoading(false); /**API request je zavrsen */
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); //podaci ulogovanog korisnika
  

  async function onToken(token) {//pomocu f-je saljemo na backend
    console.log(token);
    const bookingDetails = {
      //ovo je objekat koji cemo slati na backend (u formi modela)

      room, //room je objekat iz useState-a koji smo dobili iz backenda
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token //da proslijedimo token zajedno u objektu bookingDetails, a mogli smo i posebno u axios.post
    };
    try {
      setLoading(true)
      const result = await axios.post("/api/bookings/bookroom", bookingDetails); //prvo napravimo bookingsRoute na backendu pa onda pisemo ovdje URL
      setLoading(false)                                                             //stavili smo ovaj url kao na backendu tj slican
      Swal.fire('Čestitamo','Uspješna rezervacija','success').then(result =>{//success-parametar je tip popup-a                                                          //bookingDetails ce biti proslijeđen na backend
      window.location.href='/profile' //prebaci nas na stranicu bookings od korisnika
      })
      } catch (error) {                                                             
      setLoading(false)
      Swal.fire('Ops','Nešto nije u redu', 'error')
    }
  }

  /**Prvo provjeravamo loading pa onda room pa ako nista od toga nije true onda tek nek izbaci error ! */
  return (
    <div data-aos='flip-left'>
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="card">
          <div className="flex-container">
            <div style={{width:"60%"}}>
              <h1 id="headline">{room.name} {room.city}</h1>
              <img
                src={room.imageurls[0]}
                alt=""
                className="big-img"
              />
            </div>

            <div className="container1">
              <div className="reservation-details">
                <h1>Detalji rezervacije</h1>
                <hr />

                <b>
                  <p>Ime : {currentUser.name} </p>
                  <p>Od : {match.params.fromdate} </p>
                  <p>Do : {match.params.todate} </p>
                  <p>Kapacitet : {room.maxcount}</p>
                </b>
              </div>

              <div className="reservation-details">
                <b>
                  <h1>Iznos</h1>
                  <hr />
                  <p>Ukupno dana : {totaldays} </p>
                  <p>Cijena po danu : {room.rentperday} €</p>
                  <p>Ukupan iznos : {totalamount} €</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  currency="EUR"
                  name="Apartmani"
                  description="Naplata"
                  panelLabel="Plati"
                  token={onToken}
                  stripeKey="pk_test_51KbXOeB42lm3IJrhusf5fxHnQruPSrVad3tjYExgSGYslH81eDScnDchhIY2udy6i2k3E8gEzwl5nVGyNzdqKO4h00eedwAxoH"
                >
                  <button className="button">Plati</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
