import React, {useState} from "react";
import {Modal, Button, Carousel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; //aos google pa github za css
import './Room.css';

// ..
AOS.init({
    duration: 1000 //trajanje animacije u ms
});




function Room({ room, fromdate, todate}) { /**room je prop (takodje i fromdate i todate) */
//moramo kad kliknemo booknow da posaljemo ove props-e u url u bookingscreen
    const [show, setShow] = useState(false); /**show=true prikazuje model popup, a false sakriva model popup (View Details) */

  const handleClose = () => setShow(false); /**da zatvorimo popup model (View Details) */
  const handleShow = () => setShow(true); /**koristimo da prikaze model popup (button View Details) */
  const test = JSON.parse(localStorage.getItem('currentUser'))
  //className="row bs mr-1 ml-1"
  return (
    <div className="flex-container" data-aos='fade-up'>
      <div>
        <img src={room.imageurls[0]} alt="" className="small-image" />
      </div>
      <div >
      <div className="item">
        <h1 className="card-heading" >{room.name} {room.city}</h1>
        
        <h3>{room.adress}</h3>
        
        <b>
          <p>Kapacitet: {room.maxcount}</p>
          <p>Broj tel: {room.phonenumber}</p>
          <p>Tip: {room.type}</p>
        </b>

        <div style={{ float: "right" }}>

          {(fromdate && todate && (test!==null)) && (
           <Link to={`/book/${room._id}/${fromdate}/${todate}`} >
           <button className="button" >Rezerviši</button>
         </Link>
        
  )}

         
          <button className="button" onClick={handleShow}>Pregled detalja</button>
        </div>
      </div>
      

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name} {room.city}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel indicators={false} prevLabel='' nextLabel=''>

  
                {room.imageurls.map((url,index)=>{
                    return (
                        <Carousel.Item key={index}>
    <img key={index}
      className="big-img"
      src={url}
      alt=""
    />
    </Carousel.Item>
                    );
                })}
  
        </Carousel>
        <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
        <div className="price">
     
        <h3 id="price-text" style={{fontSize: "20px"}}><b>Cijena po danu :</b> {room.rentperday} €</h3>
        
        </div>
          <Button variant="secondary" onClick={handleClose}>
            Zatvori
          </Button>
          
          
          
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default Room;
