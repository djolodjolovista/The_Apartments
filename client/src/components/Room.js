import React, {useState} from "react";
import {Modal, Button, Carousel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; //aos google pa github za css

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
  return (
    <div className="row bs mr-1 ml-1" data-aos='fade-up'>
      <div className="col-md-4">
        <img src={room.imageurls[0]} alt="" className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1 style={{textAlign: 'cecdnter', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} >{room.name} {room.city}</h1>
        
        <h3>{room.adress}</h3>
        
        <b>
          <p>Kapacitet: {room.maxcount}</p>
          <p>Broj tel: {room.phonenumber}</p>
          <p>Tip: {room.type}</p>
        </b>

        <div style={{ float: "right" }}>

          {(fromdate && todate && (test!==null)) && (
           <Link to={`/book/${room._id}/${fromdate}/${todate}`} >
           <button className="btn btn-primary m-2" >Rezerviši</button>
         </Link>
        
  )}

         
          <button className="btn btn-primary" onClick={handleShow}>Pregled detalja</button>
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
      className="d-block w-100 bigimg"
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
        <div class="modal-content">
     
        <h3 className="text-center mt-1" style={{fontSize: "20px"}}><b>Cijena po danu :</b> {room.rentperday} €</h3>
        
        </div>
          <Button variant="secondary" onClick={handleClose}>
            Zatvori
          </Button>
          
          
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
