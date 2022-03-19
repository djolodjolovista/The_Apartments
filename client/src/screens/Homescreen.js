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
  const [searchkey, setserachkey] = useState('') //za search room filter
  const [type, settype] = useState('all') //za type filter inicijalno postavljen na all
  
    async function fetchData() {
      try {
        setloading(true); /**API request je pokrenut */
        const data = (await axios.get("/api/rooms/getallrooms")).data;

        setrooms(data);
        setduplicaterooms(data);
        setloading(false); /**API request je zavrsen */
        document.getElementById("select-list").setAttribute("disabled", "disabled")//filter type disabled dok se ne odabere datum
        document.getElementById("search-filter").setAttribute("disabled", "disabled")//search filter disabled dok se datum ne odabere
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(
          false
        ); /**ako se desi error u toku izvrsenja axios.get nece se ivrsiti setrooms i setloading */
      }
    }
    useEffect(() => {
    fetchData();
  }, []);

  function filterByDate(dates) { //dates je niz koji ima dva datuma 'start date' i 'to date'
    
   
    document.getElementById("select-list").removeAttribute("disabled")//kad odaberemo datum omoguci filter type
    document.getElementById("search-filter").removeAttribute("disabled")//kad odaberemo datum omoguci search filter
    filterByType('all') //kad promijenimo datum da vraca filter type na 'all'
    setserachkey('')//kad promijeni datum brise search key
    setfromdate(moment(dates[0]).format('DD-MM-YYYY')); //podesen format za 'start date' on je na indeksu 0
    settodate(moment(dates[1]).format('DD-MM-YYYY')); //za 'to date'
    //moramo sad info o datumu proslijediti room komponenti, a to cemo prikazati u bookingscreen
    document.getElementById("select-list").disable = false
    var temprooms = [];
    var avaliability = 0;
    for(const room of duplicaterooms)
    {avaliability=0;
      if(room.currentbookings.length > 0)
      {
        for(const booking of room.currentbookings)
        {

            //checking between-provjera da li je dates između datuma from date i to date (f-ja isBetween zahtijeva format 'YYYY-MM-DD'!!!)
          if(!(moment(moment(dates[0]).format('YYYY-MM-DD')).isBetween(moment(booking.fromdate, 'DD-MM-YYYY').format('YYYY-MM-DD'),moment(booking.todate, 'DD-MM-YYYY').format('YYYY-MM-DD')))
          && !(moment(moment(dates[1]).format('YYYY-MM-DD')).isBetween(moment(booking.fromdate, 'DD-MM-YYYY').format('YYYY-MM-DD'),moment(booking.todate, 'DD-MM-YYYY').format('YYYY-MM-DD')))
          && !(moment(moment(booking.fromdate,'DD-MM-YYYY').format('YYYY-MM-DD')).isBetween(moment(dates[0], 'DD-MM-YYYY').format('YYYY-MM-DD'),moment(dates[1], 'DD-MM-YYYY').format('YYYY-MM-DD')))
          && !(moment(moment(booking.todate,'DD-MM-YYYY').format('YYYY-MM-DD')).isBetween(moment(dates[0], 'DD-MM-YYYY').format('YYYY-MM-DD'),moment(dates[1], 'DD-MM-YYYY').format('YYYY-MM-DD')))
          )
          {   
             //provjera da li je dates jednak from date i to date
            if(moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
               moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
               moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
               moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
            )
            {
                  
              avaliability++;
            }
			      
          }

        }
      }
      if(avaliability === room.currentbookings.length || room.currentbookings.length === 0)
      {
        temprooms.push(room);
        avaliability=0;
      }
      
      temprooms = temprooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
      setrooms(temprooms);//prikazace samo slobodne sobe
    }
  
  }
 
  

  function filterBySearch() {
    const temprooms = rooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))//moramo sve prebaciti u lower case
    setrooms(temprooms)
  }

  function filterByType(e) {
    settype(e) //da prikaze u polju da li je ukljucen filter delux,non-delux ili all
    if(e!=='all')
    {
      var temprooms = rooms.filter(room=>room.type.toLowerCase()===e.toLowerCase())//ovo room je kao neka pomocna promjenjiva
      temprooms = temprooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
      setrooms(temprooms)
    }
    else{
      
      setrooms(duplicaterooms)
    }
  }

                               /**className od div-ova je iz bootstrap */
  /**Prvo provjeravamo Loading pa rooms pa ako nije nista od toga true onda tek error da izbaci !(kad ubacimo filter search brisemo error) */
  /**.map()-koristimo da kreiramo listu od JSX elemenata */
  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">

        <RangePicker allowClear={false} format="DD-MM-YYYY" onChange={filterByDate} />

        </div>
        <div className="col-md-5">
          <input type="text" id="search-filter" className="form-control" placeholder="search rooms" 
          value={searchkey} onChange={(e)=> {setserachkey(e.target.value)}} onKeyUp={filterBySearch}/>

        </div>

        <div className="col-md-3">
          
        <select className="form-control" id="select-list" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">All</option>
          <option value="delux">Delux</option>
          <option value="non-delux">Non-Delux</option>
        </select>
        </div>
        <div><button className="btn btn-primary" onClick={()=>{window.location.reload()}}>Clear</button></div>

      </div>
      <div className="row justify-content-center mt-5">  
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
                <div key={room._id} className="col-md-9 mt-2">
                    <Room room={room} fromdate={fromdate} todate={todate} />

                </div>
            );
          })
        ) }
      </div>
    </div>
  );
}

export default Homescreen;
