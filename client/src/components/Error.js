import React from "react";
/**Koristili smo alert bootstrap */

function Error({message}) {
  return (
    <div>
      <div class="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
}

export default Error;
