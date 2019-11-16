
import React, { Component } from "react";
import fire from '../firebase';
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
  Form
  } from "semantic-ui-react";

  import { Route,
    Link,
    BrowserRouter as Router , 
    Switch} from 'react-router-dom';
    
    import moment from 'moment';

  
  class FoodItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        list: [],
        keys: []
        
      };

    
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
            console.log(obj[a]);
          }
          this.setState({
            list: list1,
            keys: keys1
           
          } , ()=> this.setState({loading: false}));
  
          
        }) ; 
      
        
    }
    

    render()
    { return(<div  >
        {this.state.loading ? (
              <div>
                <Loader style={{ marginTop: "25%" }} active inline="centered" />
              </div>
            ) : null}
            <div id="headerContainer" style={{width:"75%"}}>
            <Card.Group itemsPerRow={3} textAlign='center'  >
              { this.state.list.map((item, index) =>
           Object.values(item).map((nestedItem, nestedIndex) => (
            <Link to={{
                pathname: `/buynowVillage/id=${this.state.keys[index]}/id2=${Object.keys(this.state.list[index])[nestedIndex]}`
                 }} >
            <Card>
             
              <Card.Content>
                <Label as="p" color="white" size="large" ribbon>
                  Cost : {nestedItem.cost}
                </Label>
                <Card.Header style={{ paddingTop: "2vh" }}>
                  {nestedItem.product}
                </Card.Header>
                <Card.Description>Rate :  {nestedItem.cost} per {nestedItem.cost}</Card.Description>
                <Card.Description>Quantity :{nestedItem.quantity}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <p>
                  <Icon name="user" style={{ marginRight: "5%" }} />
                  ...Retailer Detail
                </p>
                <Divider />
                
              </Card.Content>
            </Card>
            </Link>
             )) )
           }

     </Card.Group>
     </div>

       
         
     
    </div>)

    }
    
  }
    

    export default FoodItem ;
