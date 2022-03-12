import React,{useState, useEffect} from 'react';
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader"; /**importovali smo komponentu Loader da bi je mogli koristiti */
import Error from "../components/Error";

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    
    if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin)
    {
      window.location.href="/home";
    }
  
    
  }, [])
  
  return (
    <div className='mt-3 ml-3 mr-3 bs'>
        <h2 className='text-center' style={{fontSize: '30px'}}><b>Admin Panel</b></h2>
        <Tabs defaultActiveKey="1">
    <TabPane tab="Bookings" key="1">
      <Bookings />
    </TabPane>
    <TabPane tab="Rooms" key="2">
      <Rooms />
    </TabPane>
    <TabPane tab="Add Room" key="3">
      <h1>Add Room</h1>
    </TabPane>
    <TabPane tab="Users" key="4">
      <Users />
    </TabPane>
  </Tabs>
    </div>
  )
}

export default Adminscreen;

export function Bookings() {

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
   
    async function fetchData() {
        try {
            const data = (await axios.get('/api/bookings/getallbookings')).data
            setbookings(data)
            setloading(false)
              
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
        }
    }
   
   
   
    useEffect(() => {
      
        fetchData();
      
    }, [])
    

    return (
        
    <div className="row">
        
        <div className='col-md-10'>
            <h1>Bookings</h1>
            {loading && (<Loader />)}
            <table className='table table-bordered table-dark'>
                <thead className='bs'>
                    <tr>
                        <th>Booking Id</th>
                        <th>User Id</th>
                        <th>Room</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {bookings.length && (bookings.map(booking=>{
                return (
                <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td style={{whiteSpace:'nowrap'}}>{booking.room}</td>
                    <td style={{whiteSpace:'nowrap'}}>{booking.fromdate}</td>
                    <td style={{whiteSpace:'nowrap'}}>{booking.todate}</td>
                    <td>{booking.status}</td>
                </tr>
                )}
                ))}
                </tbody>
            </table>
            
        </div>

    </div>
    )
}

export function Rooms() {

  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()
 
  async function fetchData() {
      try {
          const data = (await axios.get('/api/rooms/getallrooms')).data//ovaj api imamo vec za homescreen tako da ne moramo praviti na backendu samo taj iskoristimo
          setrooms(data)
          setloading(false)
            
      } catch (error) {
          console.log(error)
          setloading(false)
          seterror(true)
      }
  }
 
 
 
  useEffect(() => {
    
      fetchData();
    
  }, [])
  

  return (
      
  <div className="row">
      
      <div className='col-md-10'>
          <h1>Rooms</h1>
          {loading && (<Loader />)}
          <table className='table table-bordered table-dark'>
              <thead className='bs'>
                  <tr>
                      <th>Room Id</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th style={{whiteSpace: 'nowrap'}}>Rent Per Day</th>
                      <th style={{whiteSpace: 'nowrap'}}>Max Count</th>
                      <th style={{whiteSpace: 'nowrap'}}>Phone Number</th>
                  </tr>
              </thead>
              <tbody>
              {rooms.length && (rooms.map(room=>{
              return (
              <tr>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td style={{whiteSpace:'nowrap'}}>{room.type}</td>
                  <td style={{whiteSpace:'nowrap'}}>{room.rentperday}</td>
                  <td style={{whiteSpace:'nowrap'}}>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
              </tr>
              )}
              ))}
              </tbody>
          </table>
          
      </div>

  </div>
  )
}

export function Users(){
  const [users, setusers] = useState([])
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()

  async function fetchData() {
    try {
        const data = (await axios.get('/api/users/getallusers')).data
        setusers(data)
        setloading(false)
          
    } catch (error) {
        console.log(error)
        setloading(false)
        seterror(true)
    }
}



useEffect(() => {
  
    fetchData();
  
}, [])

return(
  <div className='row'>
    <div className='col-md-12'>
      {loading && (<Loader />)}
      <h1>Users</h1>
      <table className='table table-dark table-bordered'>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          
          {users && (users.map(user=>{
    return (
      <tr>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.isAdmin ? ("YES") : ("NO")}</td>
      </tr>
    )
  }))}
          
        </tbody>
      </table>
    </div>
  </div>
);

}