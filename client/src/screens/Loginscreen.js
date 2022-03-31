import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader';/**importovali smo komponentu Loader da bi je mogli koristiti */
import Error from '../components/Error';

function Loginscreen() {
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
    const [error, seterror] = useState();
    

    async function Login() { //async jer koristimo await
        
        
            const user = {
                
                email,
                password
                
            }
            try {//ovo je API operacija
                setloading(true);
                const result =  (await axios.post("/api/users/login", user)).data//await uvijek pisi unutar zagrada jer nece raditi
                setloading(false)

                localStorage.setItem('currentUser', JSON.stringify(result));//JSON.stringify jer mora biti string
                //prije navigacije na home page moramo sacuvati user-a na local storage
                //to nam omogucava da pristupimo user-u bilo gdje u aplikaciji
                window.location.href = '/home'; //da nas prebaci na home page
               
                  
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)
                
            }
            
        
    }

  return (
    <div>
        {loading && (<Loader />)}
        
        <div className="row justify-content-center mt-5">
            <div className='col-md-5 mt-5'>
            {error && (<Error message='Pogrešan unos' />)}

                <div className='bs'>
                    <h2>Prijava</h2>
                   
                    <input type="text" className='form-control mt-3' placeholder='email' value={email} onChange={(e)=>{setemail(e.target.value)}} />
                    <input type="password" style={{fontFamily: "Verdana"}} className='form-control mt-3' placeholder='šifra' value={password} onChange={(e)=>{setpassword(e.target.value)}} />
                   

                    <button className='btn btn-primary mt-3' onClick={Login}>Prijava</button>
                    

                </div>

            </div>

        </div>
    </div>
  )
}

export default Loginscreen