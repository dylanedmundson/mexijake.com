import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminPage from './AdminPage'


function CurrentRoute() {
  if (window.location.pathname.endsWith('admin')) {
    return(
      <Router>
         <Route path="/admin" component={AdminPage}/>
      </Router>
    );
  } else {
    return(
      <Router>
         <Route path="/" component={App}/>
         <iframe title="spotify-playlist" src="https://open.spotify.com/embed/artist/2y6B4tT2CqHDEk3FpYPRau" width="20%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </Router>
    );
  }
}

ReactDOM.render(
    <CurrentRoute/>,
  document.getElementById('root')
);