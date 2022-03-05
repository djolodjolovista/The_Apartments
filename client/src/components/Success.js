import React from "react";
/**koristili smo alert bootstrap */
//kada je uspjesna registracija prikazuje Success element sa porukom koju smo proslijedili iz 
//registerscreen, tj props iz elementa success u registerscreen
function Success({message}) {
  return (
    <div>
      <div class="alert alert-success" role="alert">
        {message}
      </div>
    </div>
  );
}

export default Success;
