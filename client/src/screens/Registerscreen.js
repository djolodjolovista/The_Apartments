import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Loader from '../components/Loader';/**importovali smo komponentu Loader da bi je mogli koristiti */
import Error from '../components/Error';
import Success from '../components/Success';

function Registerscreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const [loading, setLoading] = useState(false); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    async function register() {
        if(password===cpassword)
        {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            try {//ovo je API operacija
                setLoading(true);
                const result = await ( axios.post("/api/users/register", user)).data
                setLoading(false);
                setSuccess(true);

                //kada je registracija zavrsena moramo isprazniti input polja i izvrsiti reload page
                //posto prikazujemo success message ne mozemo reload page nego ispraznicemo input polja
                setName('');
                setEmail('');
                setPassword('');
                setCpassword('');
                  
            } catch (error) {
                console.log(error)
                setLoading(false);
                setError(true);
            }
        }
        else {
            alert("Šifre se na poklapaju!");
        }
    }

  return (
    <div>

        {loading && (<Loader />)/*Loading se nece vidjeti jer se registracija odvija jako brzo*/}
        {error && (<Error />)}
        
        <div className="row justify-content-center mt-5">
            <div className='col-md-5 mt-5'>
            {success && <Success message="Registracija uspješna" />/**message je props koji saljemo */ }
                <div className='bs'>
                    <h2>Registracija</h2>
                    <input type="text" className='form-control' placeholder='ime' value={name} onChange={(e)=>{setName(e.target.value)}} />
                    <input type="text" className='form-control' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <input type="password" style={{fontFamily: "Verdana"}} className='form-control mt-2' placeholder='šifra' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                    <input type="password" style={{fontFamily: "Verdana"}} className='form-control mt-2' placeholder='potvrdi šifru' value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} />

                    <button className='btn btn-primary mt-3' onClick={register}>Registracija</button>
                    

                </div>

            </div>

        </div>
    </div>
  )
}

export default Registerscreen