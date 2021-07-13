import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage'


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
      </Router>
    );
  }
}

ReactDOM.render(
    <CurrentRoute/>,
  document.getElementById('root')
);