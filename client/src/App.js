import { BrowserRouter as Router, Route } from 'react-router-dom';

// component imports
import NavBar from './components/navbar.component';
import ShopPage from './pages/ShopPage'
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import CartPage from './pages/CartPage';

function App() {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Route path="/" exact component= {HomePage}/>
          <Route path="/events" component= {EventsPage}/>
          <Route path="/shop" component= {ShopPage}/>
          <Route path="/cart" component= {CartPage}/>
        </div>
      </Router>
    );
}

export default App;
