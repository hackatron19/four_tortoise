import {
    Button,
    Form,
    Header,
    Grid,
    Label,
    Dropdown,
    Transition,
    TextArea,
    Loader
  } from "semantic-ui-react";

  import PropTypes from "prop-types";


import { Route,
    
    BrowserRouter as Router , 
    Switch} from 'react-router-dom'
    
  import React, { Component } from "react";
  import fire from "../firebase";
  import "../App.css";

  import Customer from './Customer/Customer';
  import Retailer from './Retailer/Retailer';

  import DesktopContainer from '../Home/DesktopContainer';
  import MobileContainer from '../Home/MobileContainer';


 

  class Account extends Component {
    constructor(props) {
      super(props);
      this.state = {type:"xxx", loading: true  , peopleId :""}


    }

    componentWillMount()
    {
         fire.auth().onAuthStateChanged(user => {
            if (user) {
              this.checking(user.email);
            }
            else{
              console.log("{}{}{}")
            }
          });
    }

    checking(email){
     
        this.setState({loading:true});

  fire.database()
  .ref(`/people/`)
  .once("value", snapshot => {
    var obj = snapshot.val();

  for (let a in obj) {
    if(obj[a].email === email )
    {     
      this.setState({type : obj[a].type , peopleId : a});
    }
    };

    this.setState({loading:false});
  });  


 }


 render(){
  
    
    


return ( <ResponsiveContainer>
   
 <div>
   {this.state.loading?<Loader active/>:null}
<Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{  backgroundColor: "#123445" }}>

         
     {this.state.type ==="xxx" ? null : 
     this.state.type ==="Customer" ? <Customer peopleId={this.state.peopleId} /> : <Retailer peopleId={this.state.peopleId} /> }
              
</Grid.Column>
</Grid>
       </div>

       </ResponsiveContainer>


    )
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





export default Account;