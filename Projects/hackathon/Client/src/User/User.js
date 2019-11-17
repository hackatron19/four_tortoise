import React, { Component } from "react";
import fire from "../firebase";
import PropTypes from "prop-types";
import {
    
  Grid, Loader,
  
  } from "semantic-ui-react";

  import  './profile.css';

  import DesktopContainer from '../Home/DesktopContainer';
  import MobileContainer from '../Home/MobileContainer';
  
  




 
  
  class UserProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {loading : true , list:[]};


      this.checking = this.checking.bind(this);

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
      this.setState({list:obj[a]});
    }
     
   
    };

    this.setState({loading:false});
  });  


 }





  

render() {
    return ( 
      <ResponsiveContainer>
   
  
      <div>

         {this.state.loading?<Loader active/>: null} 
     
      <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{ backgroundColor: "#123445" }}>
          
          <div id="main1">  
          <div className="user-container">
          <h1 className="title">{this.state.list.type}</h1>
          
          
          <div className="user-profile">
          <div class="avatar-container">
      <img src="https://images.pexels.com/photos/756453/pexels-photo-756453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Photo" className="avatar" />
    </div>

            <h2 className="user-name">{this.state.list.name}</h2>
            <h2 className="user-email">{this.state.list.town}</h2>
            
          </div>
  </div>
  </div>

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





export default UserProfile;