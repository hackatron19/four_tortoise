import React, { Component } from "react";
import fire from "../firebase";

import { Route,
    Link,
    BrowserRouter as Router , 
    Switch} from 'react-router-dom'

import {
    Form,
    Grid,
    Loader,
    Divider,
    Header,
    Message,
    Button
  } from "semantic-ui-react";

  import Login from './Login';
  import Signup from './Signup';

  import Axios from 'axios';

  
 
  
  class Auth extends Component {
    constructor(props) {
      super(props);
      this.state = {
          toggle:true
      }
      this.toggleChange = this.toggleChange.bind(this);
    }


    componentDidMount(){


    }


    toggleChange(){

        this.setState({toggle:!this.state.toggle})
    }
    
    render(){
        return(
            <div>
                <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{  backgroundColor: "#123445" }}>
            <Grid style={{ marginTop: "5vh"}}>
          <Grid.Column  width={8}>
     <Button color="yellow" size="massive" floated="right" onClick={this.toggleChange}> Login</Button>
    </Grid.Column>
    <Grid.Column width={8}>
    <Button color="yellow" size="massive" floated="left"  onClick={this.toggleChange}> Signup</Button>
    </Grid.Column>

    <Divider/>

    
    </Grid>

    {this.state.toggle ? <Login/> : <Signup/>}
            

          </Grid.Column>
          </Grid>

            </div>
        )



    }




}


export default Auth;