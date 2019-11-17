import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Grid,
  Select,
  TextArea,
  Label,
  Icon,
  Dimmer,
  Loader ,
  Divider
} from 'semantic-ui-react'

import { Route,
  Link,
  BrowserRouter as Router , Redirect ,
  Switch} from 'react-router-dom'


import fire from '../firebase';

import Urban from './Urban';
import Rural from './Rural';


class ProfileInfo extends Component {
    
    constructor(props){
        super(props);

        this.state= {toggle: true , loggedIn: true , email:"" , redirect:false , loading: false}

      this.toggleChange =  this.toggleChange.bind(this);
       
      }


  toggleChange = () =>{
    this.setState({toggle: !this.state.toggle});
  }

  
  componentWillMount(){

fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true , email:user.email});
      }
      else{
        console.log("{}{}{}")
      }
    });
  }

 componentDidMount(){

  this.setState({loading:true});

  fire.database()
  .ref(`/people/`)
  .once("value", snapshot => {
    var obj = snapshot.val();
    
  for (let a in obj) {
    if(obj[a].email === this.state.email )
    {
      this.setState({redirect : true})
    }
     
   
    };

    this.setState({loading:false});
  });  


 }


     
  render() {

    if(this.state.redirect)
      {return <Redirect push to="/"/> }
    
    return ( <div>
      {this.state.loading ? <Loader dimmer /> : null}
      <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
<Grid.Column id="headerContainer"   style={{  backgroundColor: "#123445" }}>

  <h2 style={{ marginTop: "5vh" ,textAlign:"center" , color:"white"}}>Select Your Type...</h2>
  <Grid>
<Grid.Column  width={8}>
<Button id="cus" color="yellow" size="massive" floated="right" onClick={this.toggleChange}>Customer</Button>
</Grid.Column>
<Grid.Column width={8}>
<Button id="ret" color="yellow" size="massive" floated="left" onClick={this.toggleChange}  >Retailer</Button>
</Grid.Column>

<Divider/>


</Grid>

{this.state.toggle ? <Urban type="Customer" 
email={this.state.email} 
loggedIn={this.state.loggedIn}/> 
: <Rural type="Villager"
email={this.state.email} 
 loggedIn={this.state.loggedIn} />}
  

</Grid.Column>
</Grid>

  </div>
    )
  }
}

export default ProfileInfo;



//VillagerDisable = (e)=>{
  //       e.preventDefault();
  //       let btn= document.getElementById('cus');
  //       btn.classList.add("disabled");
  //   }
  
  //   CustomerDisable = (e)=>{
  
  //     e.preventDefault();
  
  //     let btn= document.getElementById('ret');
  //     btn.classList.add("disabled");
  // }