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

import Axios from 'axios';

import fire from '../firebase';

import Urban from './Urban';
import Rural from './Rural';


class ProfileInfo extends Component {
    
    constructor(props){
        super(props);

        this.state= {toggle: true}

      this.toggleChange =  this.toggleChange.bind(this);
       
      }


  toggleChange = () =>{
    this.setState({toggle: !this.state.toggle});
  }

  componentDidMount(){
    Axios({
      method: 'get',
      url: 'https://api.data.gov.in/resource/cb579e8f-e4e0-48eb-a058-1fc812a38ff2?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=0&limit=10',
      params : {
         records : { district_name: "Saharanpur" }
      }
    })
    .then( (data) =>
    {
        console.log(data);
    })
    .catch((err) =>{
        console.log(err);
    });


  }


     
  render() {
    
    return ( <div>
      <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
<Grid.Column id="headerContainer"   style={{  backgroundColor: "#123445" }}>

  <h2 style={{ marginTop: "5vh" ,textAlign:"center" , color:"white"}}>Select Your Type...</h2>
  <Grid>
<Grid.Column  width={8}>
<Button id="cus" color="yellow" size="massive" floated="right" onClick={this.toggleChange}>Customer</Button>
</Grid.Column>
<Grid.Column width={8}>
<Button id="ret" color="yellow" size="massive" floated="left" onClick={this.toggleChange}  >Villager</Button>
</Grid.Column>

<Divider/>


</Grid>

{this.state.toggle ? <Urban type="Customer"/> : <Rural type="Villager"/>}
  

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