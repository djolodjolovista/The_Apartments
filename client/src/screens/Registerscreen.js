import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Loader from '../components/Loader';/**importovali smo komponentu Loader da bi je mogli koristiti */
import Error from '../components/Error';
import Success from '../components/Success';

function Registerscreen() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')

    const [loading, setloading] = useState(false); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function register() {
        if(password==cpassword)
        {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            try {//ovo je API operacija
                setloading(true);
                const result = await ( axios.post("/api/users/register", user)).data
                setloading(false);
                setsuccess(true);

                //kada je registracija zavrsena moramo isprazniti input polja i izvrsiti reload page
                //posto prikazujemo success message ne mozemo reload page nego ispraznicemo input polja
                setname('');
                setemail('');
                setpassword('');
                setcpassword('');
                  
            } catch (error) {
                console.log(error)
                setloading(false);
                seterror(true);
            }
        }
        else {
            alert("Password do not match!");
        }
    }

  return (
    <div>

        {loading && (<Loader />)/*Loading se nece vidjeti jer se registracija odvija jako brzo*/}
        {error && (<Error />)}
        
        <div className="row justify-content-center mt-5">
            <div className='col-md-5 mt-5'>
            {success && <Success message="Registration success" />/**message je props koji saljemo */ }
                <div className='bs'>
                    <h2>Register</h2>
                    <input type="text" className='form-control' placeholder='name' value={name} onChange={(e)=>{setname(e.target.value)}} />
                    <input type="text" className='form-control' placeholder='email' value={email} onChange={(e)=>{setemail(e.target.value)}} />
                    <input type="text" className='form-control' placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}} />
                    <input type="text" className='form-control' placeholder='confirm password' value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}} />

                    <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                    

                </div>

            </div>

        </div>
    </div>
  )
}

export default Registerscreen