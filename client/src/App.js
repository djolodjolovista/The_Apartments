
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Link} from 'react-router-dom';/**BrowserRouter-It is the parent component that is used to store all of the other components. */
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
/**Route- Рута је условно приказана компонента заснована на подударању путање до УРЛ-а. */
function App() {
  return (
    <div className="App">
     <Navbar />
     <BrowserRouter>
     
     <Route path='/home' exact component={Homescreen} />
     <Route path='/book/:roomid' exact component={Bookingscreen} />
     <Route path='/register' exact component={Registerscreen} />
     <Route path='/login' exact component={Loginscreen} />
     </BrowserRouter>
    </div>
  );
}

export default App; /**In default export the naming of import is completely independent and we can use any name we like. */
