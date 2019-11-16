
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
import AddItem from "./AddItem";
import PostItem from "./PostItem";


  const options = [
    { key: 'kg', text: 'Kilogram', value: 'kg' },
    { key: 'l', text: 'Litres', value: 'l' },
    { key: 'num', text: 'Count', value: 'num' },
  ]
  
  

  class Retailer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
        loading: true,
       
        showSetting: false,
      
      };

  
}

  
    render() {

      let {peopleId} = this.props;
    
        return (
        <div style={{
            backgroundColor: "#f9f9f9",
            marginTop: "0vh",
            minHeight: "100vh"
          }}
        >
          <div
            id="headerContainer"
            style={{ marginTop: "0vh", minHeight: "100vh" }}
          >
            
              <div>
                <Header as="h2" style={{ paddingTop: "3vh", marginTop: "0vh" }}>
                  <Icon name="setting" />
                  <Header.Content>Manage Account</Header.Content>
                </Header>
                <Divider />
               </div> 
  
              
              <AddItem peopleId={this.props.peopleId} />

              <Divider/>
              <PostItem/>
              <Divider/>
              <Addphoto/>
            
              
        
          </div>
        </div>
      
        )
    }
    
    }
  
  
  export default Retailer;