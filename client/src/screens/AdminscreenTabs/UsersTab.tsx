import React, {useState, useEffect} from 'react';
import Loader from '../../components/Loader';
import {api} from '../Utils/ApiRequests';

const UsersTab = () => {

  interface UserType {
    _id: any;
    name: string;
    email: string;
    isAdmin: boolean;
  }

  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>()
  let data:UserType[] = [];

  async function fetchData() {
    try {
        //const data = (await axios.get('/api/users/getallusers')).data
        await api.getAllUsers().then((res) => data = res.data)
        setUsers(data)
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
    <div className='row'>
    <div className='col-md-12'>
      {loading && (<Loader />)}
      <h1>Korisnici</h1>
      <table className='users-table' >
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
        <td>{user['_id']}</td>
        <td>{user['name']}</td>
        <td>{user['email']}</td>
        <td>{user['isAdmin'] ? ("YES") : ("NO")}</td>
      </tr>
    )
  }))}
          
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default UsersTab