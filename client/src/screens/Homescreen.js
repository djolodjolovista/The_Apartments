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

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true); /**API request je pokrenut */
        const data = (await axios.get("/api/rooms/getallrooms")).data;

        setrooms(data);
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
