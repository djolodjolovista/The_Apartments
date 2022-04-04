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
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] =
    useState(); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
  const [error, setError] = useState();
  const [cityroom, setCityroom] = useState([])
  
  //hooks za datume rezervacije
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [duplicaterooms, setDuplicaterooms] = useState([]); //stvaramo drugi niz soba jer cemo taj filtrirati u zavisnosti da li je neka soba bukirana
 
  const [type, setType] = useState('all') //za type filter inicijalno postavljen na all
  const [city, setCity] = useState('none')
    async function fetchData() {
      try {
        setLoading(true); /**API request je pokrenut */
        
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        
        setRooms(data);
        setDuplicaterooms(data);
      
    
        setLoading(false); /**API request je zavrsen */
        document.getElementById("select-list").setAttribute("disabled", "disabled")//filter type disabled dok se ne odabere datum
        document.getElementById("city-filter").setAttribute("disabled", "disabled")//search filter disabled dok se datum ne odabere
        
       
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(
          false
        ); /**ako se desi error u toku izvrsenja axios.get nece se ivrsiti setRooms i setLoading */
      }
      
    }
    useEffect(() => {
    fetchData();
   
    
  }, []);

  function filterByDate(dates) { //dates je niz koji ima dva datuma 'start date' i 'to date'
    
    var temp = []
    rooms.forEach(element => {
      if(!temp.includes(element.city))
      {
        temp.push(element.city)
      }
    })
    setCityroom(temp);
    console.log(temp)
    console.log(cityroom)
    document.getElementById("select-list").removeAttribute("disabled")//kad odaberemo datum omoguci filter type
    document.getElementById("city-filter").removeAttribute("disabled")//kad odaberemo datum omoguci search filter
    filterByType('all') //kad promijenimo datum da vraca filter type na 'all'
   
    setFromdate(moment(dates[0]).format('DD-MM-YYYY')); //podesen format za 'start date' on je na indeksu 0
    setTodate(moment(dates[1]).format('DD-MM-YYYY')); //za 'to date'
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
      
      
      setRooms(temprooms);//prikazace samo slobodne sobe
      setDuplicaterooms(temprooms);
      setCity('none');
    }
  
  }
 
  

  function filterBySearch(e) {
    
    var temprooms = []
    setCity(e)
   if(e==='none')
   {
   
   if(type!=='all')
   {
     temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()===type.toLowerCase())
     setRooms(temprooms)
   }
   else if(type==='all')
   {
      setRooms(duplicaterooms)
   }
  
   }
   else
   {
     temprooms = duplicaterooms.filter(room=>room.city.toLowerCase()===e.toLowerCase())
     if(type!=='all')
     {
       temprooms = temprooms.filter(room=>room.type.toLowerCase()===type.toLowerCase())
     }
     setRooms(temprooms)
   }
  }

  function filterByType(e) {
    
    setType(e) //da prikaze u polju da li je ukljucen filter delux,non-delux ili all
    var temprooms = []
    if(e==='delux')
    {
      
       temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()===e.toLowerCase())//ovo room je kao neka pomocna promjenjiva
       
           if(city!=='none') 
           {
       temprooms = temprooms.filter(room=>room.city.toLowerCase().includes(city.toLowerCase()))
           }
      setRooms(temprooms)
      
    }
    else if(e==='non-delux')
    {
      
       temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()===e.toLowerCase())//ovo room je kao neka pomocna promjenjiva
      if(city!=='none')
      {
       temprooms = temprooms.filter(room=>room.city.toLowerCase().includes(city.toLowerCase()))
       setRooms(temprooms)
      }
      else
      {
        setRooms(temprooms)
      }
      
      
    }
    else if(e==='all'){
      
      if(city!=='none')
      {
      temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(city.toLowerCase()))
      setRooms(temprooms)
      }
      else
      {
        setRooms(duplicaterooms)
      }
     
      
      
    }
  }
   /**className od div-ova je iz bootstrap */
  /**Prvo provjeravamo Loading pa rooms pa ako nije nista od toga true onda tek error da izbaci !(kad ubacimo filter search brisemo error) */
  /**.map()-koristimo da kreiramo listu od JSX elemenata */
 
  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3 mt-1 mb-1" style={{ display: "flex", alignItems: "center" }}>

        <RangePicker allowClear={false} format="DD-MM-YYYY" onChange={filterByDate} />

        </div>
        <div className="col-md-4 mt-1 mb-1" style={{ display: "flex", alignItems: "center" }}>
        <select className="form-control" id="city-filter" value={city}  onChange={(e)=>{filterBySearch(e.target.value)}}>
          <option value="none">Mjesto</option>
            {cityroom && (
              cityroom.map((room, index)=>{
                return (
                  <option key={index} value={room}>{room}</option>
                )
              })
            )}
            

          </select>

        </div>

        <div className="col-md-3 mt-1 mb-1"
        style={{ display: "flex", alignItems: "center" }}>
          
        <select className="form-control" id="select-list" value={type}  onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">Sve</option>
          <option value="delux">Delux</option>
          <option value="non-delux">Non-Delux</option>
        </select>
        </div>
        <div className="col-md-2 mt-1 mb-1"
          style={{ display: "flex", alignItems: "center" }}>
          <button className="btn btn-primary w-100" onClick={()=>{window.location.reload()}}>Obriši</button></div>

      </div>
      <div className="row justify-content-center mt-5 pb-5">  
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
                <div key={room._id} className="col-md-6 p-1 mt-2">
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
