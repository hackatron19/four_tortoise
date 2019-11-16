import React from 'react';

import './App.css';

import { Route,
    
  BrowserRouter as Router , 
  Switch} from 'react-router-dom'


 import Home from './Home/Home';
import Auth from './Auth/Auth';

import RetailerAdd from './Account/Retailer'



function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
    />
      <Route path="/auth" component={Auth} />
      <Route path="/retailer" component ={RetailerAdd}/>
      }
     
    </Switch>
  </Router>
  );
}

export default App;
