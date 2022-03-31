import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; //aos google pa github za css

// ..
AOS.init({
    duration: 2000
});

function Landingscreen() { //'col-md-12' znaci da smo uzeli komplet duzinu reda 'row' tj.svih 12 kolona
  return (
    <div className='row landing justify-content-center'>
        <div className='col-md-10 text-center my-auto' style={{borderRight: '8px solid white'}}>
            <h2 data-aos='zoom-in-down' style={{color: 'white', fontSize: '120px'}}>The Apartments</h2>
            <h1 data-aos='zoom-out-down' style={{color: 'white'}}>There is only one boss. The Guest</h1>
            <Link to='/home'>
                <button className='btn landingbtn' style={{color:'black'}}>Pregled</button>
            </Link>
        </div>
    </div>
  )
}

export default Landingscreen