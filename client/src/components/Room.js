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
  return (
    <div className="row bs" data-aos='fade-up'>
      <div className="col-md-4">
        <img src={room.imageurls[0]} alt="" className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>

        <div style={{ float: "right" }}>

          {(fromdate && todate) && (
           <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
           <button className="btn btn-primary m-2">Book Now</button>
         </Link>
        
  )}

         
          <button className="btn btn-primary" onClick={handleShow}>View Details</button>
        </div>
      </div>
      

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel prevLabel='' nextLabel=''>

  
                {room.imageurls.map(url=>{
                    return (
                        <Carousel.Item>
    <img
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
