import React,{useState, useEffect} from 'react';
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader"; /**importovali smo komponentu Loader da bi je mogli koristiti */
import Error from "../components/Error";
import Swal from "sweetalert2";

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
    <TabPane tab="Rezervacije" key="1">
      <Bookings />
    </TabPane>
    <TabPane tab="Sobe" key="2">
      <Rooms />
    </TabPane>
    <TabPane tab="Dodaj sobu" key="3">
      <AddRoom />
    </TabPane>
    <TabPane tab="Korisnici" key="4">
      <Users />
    </TabPane>
  </Tabs>
    </div>
  )
}

export default Adminscreen;

//Bookings component (mogli smo i napraviti u folderu components pa importovati)
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
        
        <div className='col-md-12'>
            <h1>Rezervacije</h1>
            {loading && (<Loader />)}
            <table className='table table-bordered table-dark'>
                <thead className='bs'>
                    <tr>
                        <th>ID rezervacije</th>
                        <th>ID korisnika</th>
                        <th>Soba</th>
                        <th>Mjesto</th>
                        <th>Od</th>
                        <th>Do</th>
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
                    <td style={{whiteSpace:'nowrap'}}>{booking.roomcity}</td>
                    <td style={{whiteSpace:'nowrap'}}>{booking.fromdate}</td>
                    <td style={{whiteSpace:'nowrap'}}>{booking.todate}</td>
                    {booking.status === "booked" ? (<td>Potvrđeno</td>) : (<td>Otkazano</td>)}
                </tr>
                )}
                ))}
                </tbody>
            </table>
            
        </div>

    </div>
    )
}

//Rooms component
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
      
      <div className='col-md-12'>
          <h1>Sobe</h1>
          {loading && (<Loader />)}
          <table className='table table-bordered table-dark'>
              <thead className='bs'>
                  <tr>
                      <th>ID sobe</th>
                      <th>Naziv</th>
                      <th>Mjesto</th>
                      <th>Tip</th>
                      <th style={{whiteSpace: 'nowrap'}}>Cijena po danu</th>
                      <th style={{whiteSpace: 'nowrap'}}>Kapacitet</th>
                      <th style={{whiteSpace: 'nowrap'}}>Broj tel</th>
                  </tr>
              </thead>
              <tbody>
              {rooms.length && (rooms.map(room=>{
              return (
              <tr>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.city}</td>
                  <td style={{whiteSpace:'nowrap'}}>{room.type}</td>
                  <td style={{whiteSpace:'nowrap'}}>{room.rentperday} €</td>
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

//Users component
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
      <h1>Korisnici</h1>
      <table className='table table-dark table-bordered'>
        <thead>
          <tr>
            <th>ID korisnika</th>
            <th>Ime</th>
            <th>Email</th>
            <th>Admin</th>
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

//Add Room component


export function AddRoom() {

  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()

  const [name, setname] = useState('')
  const [adress, setadress] = useState('')
  const [city, setCity] = useState('')
  const [rentperday, setrentperday] = useState()
  const [maxcount, setmaxcount] = useState()
  const [description, setdescription] = useState('')
  const [phonenumber, setphonenumber] = useState('')
  const [type, settype] = useState('')
  const [imageurl1, setimageurl1] = useState('')
  const [imageurl2, setimageurl2] = useState('')
  const [imageurl3, setimageurl3] = useState('')

  async function addRoom(){//dodavanje nove sobe
    if(name!=='' && adress!=='' && city!=='' && rentperday!==undefined && maxcount!==undefined && description!==''
    && phonenumber!=='' && type!=='tip' && type!=='' && imageurl1!=='' && imageurl2!=='' && imageurl3!=='')
    {
    const newroom = {
      name,
      adress,
      city,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1,imageurl2,imageurl3]
    }
    try {
      setloading(true)
     const result = (await axios.post('/api/rooms/addroom', newroom)).data
     console.log(result)
     setloading(false)
     Swal.fire('Čestitamo','Uspješno ste dodali novu sobu','success').then(result=>
      window.location.href="/home")
    } catch (error) {
      console.log(error)
      setloading(false)
      Swal.fire('Oops','Nešto nije u redu','error')
    }
  }
  else
  {
    Swal.fire('Upozorenje', 'Sva polja moraju biti popunjena!','warning')
  }
  }

  return (
    <div className='row'>
      
      <div className='col-md-5'>
      {loading && (<Loader />)}
        <input type='text' className='form-control' placeholder='Naziv smještaja'
        value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='Mjesto'
        value={city} onChange={(e)=>{setCity(e.target.value)}} />
        <input type='text' className='form-control' placeholder='Adresa'
        value={adress} onChange={(e)=>{setadress(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='Cijena po danu'
        value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='Kapacitet'
        value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='Opis'
        value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='Broj tel'
        value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}/>

      </div>
      <div className='col-md-5'>
      <select className='form-control mt-2' value={type} onChange={(e)=>{settype(e.target.value)}}>
        <option value='tip'>Tip</option>
        <option value='Delux'>Delux</option>
        <option value='Non-Delux'>Non-Delux</option>
      </select>
      <input type='text' className='form-control' placeholder='Slika 1 URL'
      value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}/>
      <input type='text' className='form-control' placeholder='Slika 2 URL'
      value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}/>
      <input type='text' className='form-control' placeholder='Slika 3 URL'
      value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}/>

      <div className='text-right'>
        <button className='btn btn-primary mt-2' onClick={addRoom}>Dodaj sobu</button>

      </div>

      </div>
      

    </div>
  )
}

