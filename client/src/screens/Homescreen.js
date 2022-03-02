import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] =
    useState(); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
  const [error, seterror] = useState();

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
                               /**className od div-ova je iz bootstrap */
  /**Prvo provjeravamo Loading pa rooms pa ako nije nista od toga true onda tek error da izbaci ! */
  /**.map()-koristimo da kreiramo listu od JSX elemenata */
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">  
        {loading ? (
          <Loader />
        ) : rooms.length>1 ? (
          rooms.map((room) => {
            return (
                <div className="col-md-9 mt-2">
                    <Room room={room} />

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
