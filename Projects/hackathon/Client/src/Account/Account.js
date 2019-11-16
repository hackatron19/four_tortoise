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


import { Route,
    
    BrowserRouter as Router , 
    Switch} from 'react-router-dom'
    
  import React, { Component } from "react";
  import fire from "../firebase";
  import "../App.css";

  import Customer from './Customer';
  import Retailer from './Retailer';


 

  class Account extends Component {
    constructor(props) {
      super(props);
      this.state = {type:"xxx", loading: true}


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
        
      this.setState({type : obj[a].type});
    }
     
   
    };

    this.setState({loading:false});
  });  


 }


 render(){
  
    
    


return ( <div>
   {this.state.loading?<Loader active/>:null}
<Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{  backgroundColor: "#123445" }}>

         
     {this.state.type ==="xxx" ? null : 
     this.state.type ==="Customer" ? <Customer/> : <Retailer/> }
              
</Grid.Column>
</Grid>
       </div>


    )
 }




}


export default Account;