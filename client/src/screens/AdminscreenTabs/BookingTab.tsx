import React, {useState, useEffect} from 'react';
import Loader from '../../components/Loader'; 
import {api} from '../Utils/ApiRequests';



const BookingTab = () => {

    interface BookingType {
        _id: any;
        room: string;
        roomcity: string;
        roomid: string;
        userid: string;
        fromdate: string;
        todate: string;
        totalamount: number;
        totaldays: number;
        transactionId: string;
        status: string;
    }

    

    const [bookings, setBookings] = useState<BookingType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>()
    let data: BookingType[] = [];
   
    async function fetchData() {
        try {
            //const data = (await axios.get('/api/bookings/getallbookings')).data
            data = await api.getAllBookings().then((res) => data = res.data)
            setBookings(data)
            setLoading(false)
              
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
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
                    <td>{booking['_id']}</td>
                    <td>{booking['userid']}</td>
                    <td style={{whiteSpace:'nowrap'}}>{booking['room']}</td>
                    <td style={{whiteSpace:'nowrap'}}>{booking['roomcity']}</td>
                    <td style={{whiteSpace:'nowrap'}}>{booking['fromdate']}</td>
                    <td style={{whiteSpace:'nowrap'}}>{booking['todate']}</td>
                    {booking['status'] === "booked" ? (<td>Potvrđeno</td>) : (<td>Otkazano</td>)}
                </tr>
                )}
                ))}
                </tbody>
            </table>
            
        </div>
      

    </div>
  )
}

export default BookingTab