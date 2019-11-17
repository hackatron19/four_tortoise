
import React, { Component } from "react";
import fire from '../firebase';
import PropTypes from "prop-types";
import {
    Button,
  Container,
  Card,
  Icon,
  Image,
  Grid,
  Loader,
  Divider,
  Label,
  Form,
  Table,
  Input
  } from "semantic-ui-react";

  import { Route,
    Link,
    BrowserRouter as Router , 
    Switch} from 'react-router-dom';
    
    import moment from 'moment';

    import MobileContainer from '../Home/MobileContainer';
    import DesktopContainer from '../Home/DesktopContainer';

  
  class FoodItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        list: [],
        keys: [] ,
       retailer:[]
        
      };

      this.retailerList = this.retailerList.bind(this);

    
    }


    retailerList(){
       
     this.state.list.map((item , index) =>{
       console.log(item);
     })

      
    }
   
    componentDidMount = () => 
    {

         fire.database()
        .ref(`/foodItem/`)
        .on("value", snapshot => {
          var obj = snapshot.val();
          var list1 = [];
          var keys1 = [];
          for (let a in obj) {
            list1.push(obj[a]);
            keys1.push(a);
          
          }
          this.setState({
            list: list1,
            keys: keys1 ,
           loading : false
          } , () => this.retailerList )
        }) ; 
      
        
    }

    handleChange(e){
   e.preventDefault();

   this.setState({quantity: e.target.name});

    }
    

    
    render()
    { return(<div  >  <ResponsiveContainer>

       
            <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{ backgroundColor: "#123445" }}>
          {this.state.loading ? (
              <div>
                <Loader style={{ marginTop: "25%" }} active inline="centered" />
              </div>
            ) : null}
            <Card.Group itemsPerRow={3} textAlign='center'  >
              { this.state.list.map((item, index) =>
           Object.values(item).map((nestedItem, nestedIndex) => (
            <Card  style={{background:"lightcoral" ,color:"white"}} >
            <Link to={{
                  pathname: `/show/id=${this.state.keys[index]}/id2=${Object.keys(this.state.list[index])[nestedIndex]}`
                   }} >  
            
              <Card.Content>
                <Label as="h2" color="white" size="large" ribbon>
                  Type : "Cereals"
                </Label>
                <Card.Header as="h2" style={{ paddingTop: "2vh" }}>
                 Product  : {nestedItem.product}
                </Card.Header>
                <Card.Description><h3> Quantity :{nestedItem.quantity}</h3></Card.Description>
                <Card.Description> <h3> Cost :{nestedItem.cost} </h3> </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <p>
                  <Icon name="user" style={{ marginRight: "5%" }} />
                  by Retailer....
                </p>
                <Divider />
                <p>
                  <Icon name="clock" style={{ marginRight: "5%" }} />
                  time stamp
                </p>
                
              </Card.Content></Link>
            </Card> 
             )) )
           }

     </Card.Group>
   </Grid.Column>
   </Grid>
       
     </ResponsiveContainer>
     
    </div>)

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




    export default FoodItem ;





  


    

 

