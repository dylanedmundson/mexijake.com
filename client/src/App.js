import { BrowserRouter as Router, Route } from 'react-router-dom';

// component imports
import NavBar from './components/navbar.component';
import Shop from './components/shop.component'

function App() {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Route path="/" exact/>
          <Route path="/events"/>
          <Route path="/shop" component= {Shop}/>
          <Route path="/cart"/>
        </div>
      </Router>
    );
}

export default App;
