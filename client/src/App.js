
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Link} from 'react-router-dom';/**BrowserRouter-It is the parent component that is used to store all of the other components. */
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
/**Route- ruta je uslovno prikazana komponenta zasnovana na podudaranju putanje do URL-a */

///:fromdate/:todate saljemo ih iz homescreen u bookingscreen kao props zato cemo i u Room morati navesti ta dva
function App() {
  return (
    <div className="App">
     <Navbar />
     <BrowserRouter>
     
     <Route path='/home' exact component={Homescreen} />
     <Route path='/book/:roomid/:fromdate/:todate' exact component={Bookingscreen} /> 
     <Route path='/register' exact component={Registerscreen} />
     <Route path='/login' exact component={Loginscreen} />
     <Route path='/profile' exact component={Profilescreen} />
     <Route path='/admin' exact component={Adminscreen} />
     <Route path='/' exact component={Landingscreen} />
     </BrowserRouter>
    </div>
  );
}

export default App; 
/**export default- ime kod importovanja je nezavisno i možemo koristiti ime koje želimo */