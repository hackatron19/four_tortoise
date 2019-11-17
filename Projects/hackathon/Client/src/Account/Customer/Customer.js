
import {
    Button,
    Form,
    Header,
    Input,
    Icon,
    Loader,
    Divider,
    Label,
    Dropdown,
    Transition,
    TextArea
  } from "semantic-ui-react";


import { Route,
    
    BrowserRouter as Router , 
    Switch} from 'react-router-dom'
    
  import React, { Component } from "react";
  import fire from "../../firebase";
 
import Addphoto from "../AddPhoto";

import RequestByCustomer from './Request';
import Transaction from "./Transaction";

  
  

  class Customer extends Component {
    constructor(props) {
      super(props);
      this.state = {}


    }

    render(){

        return(<div>
            <Addphoto/>
            <RequestByCustomer/>
            <Divider/>
           <Transaction/>
        </div>)
    }

}


export default Customer;