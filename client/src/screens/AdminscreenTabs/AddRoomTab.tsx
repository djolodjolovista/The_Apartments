import React, {useState} from 'react';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import {api} from '../Utils/ApiRequests';

export interface RoomType {
  name: string;
  adress: string;
  city: string;
  rentperday: number;
  maxcount: number;
  description: string;
  phonenumber: string;
  type: string;
  imageurls: string[];
}

const AddRoomTab = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [adress, setAdress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [rentperday, setRentperday] = useState<number>()
  const [maxcount, setMaxcount] = useState<number>()
  const [description, setDescription] = useState<string>('')
  const [phonenumber, setPhonenumber] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [imageurl1, setImageurl1] = useState<string>('')
  const [imageurl2, setImageurl2] = useState<string>('')
  const [imageurl3, setImageurl3] = useState<string>('')

  async function addRoom(){//dodavanje nove sobe
    if(name!=='' && adress!=='' && city!=='' && rentperday!==undefined && maxcount!==undefined && description!==''
    && phonenumber!=='' && type!=='tip' && type!=='' && imageurl1!=='' && imageurl2!=='' && imageurl3!=='')
    {
      
    const newroom: RoomType = {
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
      setLoading(true)
      let result = {};
     //const result = (await axios.post('/api/rooms/addroom', newroom)).data
     await api.addNewRoom(newroom).then((res) => result = res.data )
     console.log(result)
     setLoading(false)
     Swal.fire('Čestitamo','Uspješno ste dodali novu sobu','success').then(result=>
      window.location.href="/home")
    } catch (error) {
      console.log(error)
      setLoading(false)
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
        value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='Mjesto'
        value={city} onChange={(e)=>{setCity(e.target.value)}} />
        <input type='text' className='form-control' placeholder='Adresa'
        value={adress} onChange={(e)=>{setAdress(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='Cijena po danu'
        value={rentperday} onChange={(e)=>{setRentperday(parseInt(e.target.value))}}/>
        <input type='text' className='form-control' placeholder='Kapacitet'
        value={maxcount} onChange={(e)=>{setMaxcount(parseInt(e.target.value))}}/>
        <input type='text' className='form-control' placeholder='Opis'
        value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
        <input type='text' className='form-control' placeholder='Broj tel'
        value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}}/>

      </div>
      <div className='col-md-5'>
      <select className='form-control mt-2' value={type} onChange={(e)=>{setType(e.target.value)}}>
        <option value='tip'>Tip</option>
        <option value='Delux'>Delux</option>
        <option value='Non-Delux'>Non-Delux</option>
      </select>
      <input type='text' className='form-control' placeholder='Slika 1 URL'
      value={imageurl1} onChange={(e)=>{setImageurl1(e.target.value)}}/>
      <input type='text' className='form-control' placeholder='Slika 2 URL'
      value={imageurl2} onChange={(e)=>{setImageurl2(e.target.value)}}/>
      <input type='text' className='form-control' placeholder='Slika 3 URL'
      value={imageurl3} onChange={(e)=>{setImageurl3(e.target.value)}}/>

      <div className='text-right'>
        <button className='btn btn-primary mt-2' onClick={addRoom}>Dodaj sobu</button>

      </div>

      </div>
      

    </div>
  )
}

export default AddRoomTab