import React,{useState, useEffect} from "react";
import { Tabs } from "antd";
import axios from 'axios';
import Loader from "../components/Loader"; /**importovali smo komponentu Loader da bi je mogli koristiti */
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Tag, Divider } from 'antd';

const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem('currentUser')) //trenutni korisnik

    useEffect(() => {
      
        if(!user){
            window.location.href='/login'
        }
    
     
    }, [])
    

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
      <TabPane  tab="Bookings" key="1">
          <MyBookings />
        </TabPane>
        <TabPane tab="Profile" key="2">
          <p>My profile</p>
          <br />
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>IsAdmin:</b> {user.isAdmin ? 'YES' : 'NO'}</p>
        </TabPane>
        
        
      </Tabs>
    </div>
  );
}

export default Profilescreen;



export function MyBookings() { //koristili smo odvojenu komponentu jer ce biti dosta vise logike nego za my profile
    
    const user = JSON.parse(localStorage.getItem('currentUser')) //trenutni korisnik
    const [bookings, setbookings] = useState([])
    const [loading, setloading] =
    useState(
      false
    ); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
  const [error, seterror] = useState();

    async function fetchData(){

        try {
            setloading(true)
            const data = (await axios.post('/api/bookings/getbookingsbyuserid',{userid: user._id})).data //endpoint
        console.log(data)
        setbookings(data)
        setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
        }
    }
    useEffect(()=>{
      
        fetchData();
      
    }, [])

    async function cancelBooking(bookingid, roomid) {
        try {
            setloading(true)
            const result = (await axios.post('/api/bookings/cancelbooking',{bookingid, roomid})).data
            console.log(result)
            setloading(false)
            Swal.fire('Congrats', 'Your booking has been cancelled','success').then(result=>{
                window.location.reload()
            })
        } catch (error) {
            setloading(false)
            console.log(error)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }

    }

    //booking.room,booking._id ... pratis u booking.js
    return (
    <div>
        {loading && (<Loader />) }
        <div className="row">
        
            <div className="col-md-6">
            
                {bookings && (bookings.map(booking =>{
                    return (<div className="bs">
                        <h1>{booking.room}</h1>
                        <p><b>BookingId:</b> {booking._id}</p>
                        <p><b>CheckIn:</b> {booking.fromdate}</p>
                        <p><b>Check Out:</b> {booking.todate}</p>
                        <p><b>Amount:</b> {booking.totalamount}</p>
                        <p><b>Status:</b> {booking.status=='cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}</p>

                       {booking.status !== 'cancelled' && ( 
                        <div className="text-right">
                            <button className="btn btn primary" onClick={()=>{cancelBooking(booking._id, booking.roomid)}}>CANCEL BOOKING</button>
                        </div>
                        )}
                    </div>)
                }))}
            </div>

        </div>
    </div>
  )
}


