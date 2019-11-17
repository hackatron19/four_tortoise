
import React, { Component } from "react";
import PropTypes from "prop-types";
import fire from '../firebase'


import Main1 from '../components/main';

import MobileContainer from './MobileContainer';
import DesktopContainer from './DesktopContainer';



import { Route,
  Link,
  BrowserRouter as Router , 
  Switch} from 'react-router-dom'



import {
  Button,
  Container,
  Icon,
  Image,
  Header,
  Grid,
  Loader,
  Divider,
 
  Form ,
 
} from "semantic-ui-react";
import "../App.css";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user:"XVZ",
      loggedIn : false
    };

   this.logout=this.logout.bind(this);
   
  }

  logout =  () =>
  { 
     fire.auth().signOut();
     
  }

 

    componentWillMount = () => {


      fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loggedIn: true , loading : false});
          console.log(user.email);
        } else {
          this.setState({ loading: false, loggedIn: false });
          console.log("xyz");
        }
      });
    };

  


  render() {
   return (
      <div style={{ backgroundColor: "#f9f9f9", marginTop: "0vh" }}>

<ResponsiveContainer>
   
   
       
        <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{ backgroundColor: "#123445" }}>


          <Main1 />
 

          
   {this.state.loading  ? <Loader active /> : <div><Button negative ><Link to="/auth">Test key</Link></Button>
          <Button positive onClick={this.logout} ><Link to="/auth">Logout</Link></Button>
          <a>{this.state.user}</a>
           </div>}
          
           

            

          </Grid.Column>

        
        </Grid>
        </ResponsiveContainer>
        
      </div>
    );
  }
}

const ResponsiveContainer = ({ children }) => 
  (
  <div>
    <DesktopContainer  >{children }</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};


export default Home;