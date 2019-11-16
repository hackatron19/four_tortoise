import React from 'react';

import './App.css';

import { Route,
    
  BrowserRouter as Router , 
  Switch} from 'react-router-dom'

 import test1 from './Test/test2' ;
 import Home from './Home/Home';
import Auth from './Auth/Auth';
import ProfielInfo from './Profile/ProfileInfo';
import ResisterRetailer from './Admin/Register';
import VillageList from './ListVillage/List';
import Retailer from './Account/Retailer';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path = "/test" component={test1}/>
      <Route path="/auth" component={Auth} />
      <Route path="/profileInfo" component={ProfielInfo}/>
      <Route path="/admin/resisterRetailer" component={ResisterRetailer}/>
      <Route path="/villageList" component={VillageList}/>
      <Route path="/retailer" component={Retailer}/>}
     
    </Switch>
  </Router>
  );
}

export default App;
