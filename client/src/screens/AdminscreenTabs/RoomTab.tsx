import React, {useState, useEffect} from 'react';
import Loader from '../../components/Loader';
import {api} from '../Utils/ApiRequests';


const RoomTab = () => {

    interface RoomsType {
        _id: any;
        name: string;
        city: string;
        type: string;
        rentperday: number;
        maxcount: number;
        phonenumber: string;
    }

  const [rooms, setRooms] = useState<RoomsType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>()
//  let data: React.SetStateAction<RoomsType[]> = [];
    let data : RoomsType[] = [];
  async function fetchData() {
      try {
          //const data = (await req.getAllRooms).data//ovaj api imamo vec za homescreen tako da ne moramo praviti na backendu samo taj iskoristimo
          await api.getAllRooms().then((res) => { data = res.data})
          setRooms(data)
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
                  <td>{room['_id']}</td>
                  <td>{room['name']}</td>
                  <td>{room['city']}</td>
                  <td style={{whiteSpace:'nowrap'}}>{room['type']}</td>
                  <td style={{whiteSpace:'nowrap'}}>{room['rentperday']} €</td>
                  <td style={{whiteSpace:'nowrap'}}>{room['maxcount']}</td>
                  <td>{room['phonenumber']}</td>
              </tr>
              )}
              ))}
              </tbody>
          </table>
          
      </div>

  </div>
  )
}

export default RoomTab