import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from 'antd'; 
import 'antd/dist/antd.css'; //importovanje css-a za date picker
import moment from 'moment';


const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] =
    useState(); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
  const [error, seterror] = useState();

  //hooks za datume rezervacije
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]); //stvaramo drugi niz soba jer cemo taj filtrirati u zavisnosti da li je neka soba bukirana

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true); /**API request je pokrenut */
        const data = (await axios.get("/api/rooms/getallrooms")).data;

        setrooms(data);
        setduplicaterooms(data);
        setloading(false); /**API request je zavrsen */
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(
          false
        ); /**ako se desi error u toku izvrsenja axios.get nece se ivrsiti setrooms i setloading */
      }
    }

    fetchData();
  }, []);

  function filterByDate(dates) { //dates je niz koji ima dva datuma 'start date' i 'to date'

    setfromdate(moment(dates[0]).format('DD-MM-YYYY')); //podesen format za 'start date' on je na indeksu 0
    settodate(moment(dates[1]).format('DD-MM-YYYY')); //za 'to date'
    //moramo sad info o datumu proslijediti room komponenti, a to cemo prikazati u bookingscreen

    //filtriranje soba
    var temprooms = [];
    var avaliability = false;
    for(const room of duplicaterooms)
    {
      if(room.currentbookings.length > 0)
      {
        for(const booking of room.currentbookings)
        {
          
            //checking between-provjera da li je dates između datuma from date i to date (f-ja isBetween zahtijeva format 'YYYY-MM-DD'!!!)
          if(!moment(moment(dates[0]).format('YYYY-MM-DD')).isBetween(moment(booking.fromdate, 'DD-MM-YYYY').format('YYYY-MM-DD'),moment(booking.todate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
          && !moment(moment(dates[1]).format('YYYY-MM-DD')).isBetween(moment(booking.fromdate, 'DD-MM-YYYY').format('YYYY-MM-DD'),moment(booking.todate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
          )
          {   
             //provjera da li je dates jednak from date i to date
            if(moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
               moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
               moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
               moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
            )
            {
              
              avaliability = true;
            }
          }
          
        }
      }
      if(avaliability == true || room.currentbookings.length == 0)
      {
        temprooms.push(room);
      }
      setrooms(temprooms);//prikazace samo slobodne sobe
    }
  }

                               /**className od div-ova je iz bootstrap */
  /**Prvo provjeravamo Loading pa rooms pa ako nije nista od toga true onda tek error da izbaci ! */
  /**.map()-koristimo da kreiramo listu od JSX elemenata */
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">

        <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />

        </div>

      </div>
      <div className="row justify-content-center mt-5">  
        {loading ? (
          <Loader />
        ) : rooms.length>1 ? (
          rooms.map((room) => {
            return (
                <div className="col-md-9 mt-2">
                    <Room room={room} fromdate={fromdate} todate={todate} />

                </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
