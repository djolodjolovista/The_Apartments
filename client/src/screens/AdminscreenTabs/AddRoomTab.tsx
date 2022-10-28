import React, {useState} from 'react';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import {api} from '../Utils/ApiRequests';
import useInput from '../../hooks/useInput';

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
  const name  = useInput<string>('')
  const adress = useInput<string>('')
  const city = useInput<string>('')
  const rentperday = useInput<number>(NaN)
  const maxcount = useInput<number>(NaN)
  const description = useInput<string>('')
  const phonenumber = useInput<string>('')
  const type = useInput<string>('')
  const imageurl1 = useInput<string>('')
  const imageurl2 = useInput<string>('')
  const imageurl3 = useInput<string>('')

  async function addRoom(){//dodavanje nove sobe
    if(name.value!=='' && adress.value!=='' && city.value!=='' && rentperday.value!==undefined && maxcount!==undefined && description.value!==''
    && phonenumber.value!=='' && type.value!=='tip' && type.value!=='' && imageurl1.value!=='' && imageurl2.value!=='' && imageurl3.value!=='')
    {
      
    const newroom: RoomType = {
      name: name.value,
      adress: adress.value,
      city: city.value,
      rentperday: rentperday.value,
      maxcount: maxcount.value,
      description: description.value,
      phonenumber: phonenumber.value,
      type: type.value,
      imageurls: [imageurl1.value,imageurl2.value,imageurl3.value]
    }
    try {
      setLoading(true)
      //let result = {};
     //const result = (await axios.post('/api/rooms/addroom', newroom)).data
     await api.addNewRoom(newroom)//.then((res) => result = res.data )
     // console.log(result)
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
        value={name.value} onChange={name.onChange}/>
        <input type='text' className='form-control' placeholder='Mjesto'
        value={city.value} onChange={city.onChange} />
        <input type='text' className='form-control' placeholder='Adresa'
        value={adress.value} onChange={adress.onChange}/>
        <input style={{marginTop:"10px"}} type='number' step='any' inputMode='decimal' className='form-control' placeholder='Cijena po danu'
        value={rentperday.value} onChange={rentperday.onChange}/>
        <input style={{marginTop:"10px"}} type='number' className='form-control' placeholder='Kapacitet'
        value={maxcount.value} onChange={maxcount.onChange}/>
        <input type='text' className='form-control' placeholder='Opis'
        value={description.value} onChange={description.onChange}/>
        <input type='text' className='form-control' placeholder='Broj tel'
        value={phonenumber.value} onChange={phonenumber.onChange}/>

      </div>
      <div className='col-md-5'>
      <select className='form-control mt-2' value={type.value} onChange={type.onChange}>
        <option value='tip'>Tip</option>
        <option value='Delux'>Delux</option>
        <option value='Non-Delux'>Non-Delux</option>
      </select>
      <input type='text' className='form-control' placeholder='Slika 1 URL'
      value={imageurl1.value} onChange={imageurl1.onChange}/>
      <input type='text' className='form-control' placeholder='Slika 2 URL'
      value={imageurl2.value} onChange={imageurl2.onChange}/>
      <input type='text' className='form-control' placeholder='Slika 3 URL'
      value={imageurl3.value} onChange={imageurl3.onChange}/>

      <div className='text-right'>
        <button className='btn btn-primary mt-2' onClick={addRoom}>Dodaj sobu</button>

      </div>

      </div>
      

    </div>
  )
}

export default AddRoomTab