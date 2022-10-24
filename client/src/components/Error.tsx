
import React from "react";
/**Koristili smo alert bootstrap */


const Error =({message}:{message: string}) => {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
}

export default Error;
