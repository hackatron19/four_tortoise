
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
  Form,
  Table,
  Input
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
        keys: [] ,
        cartlist:[]
        
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

    handleChange(e){
   e.preventDefault();

   this.setState({quantity: e.target.name});

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
            <Card   >
            <Link to={{
                  pathname: `/show/id=${this.state.keys[index]}/id2=${Object.keys(this.state.list[index])[nestedIndex]}`
                   }} >  
            
              <Card.Content>
                <Label as="p" color="white" size="large" ribbon>
                  Product Name : {nestedItem.product}
                </Label>
                <Card.Header style={{ paddingTop: "2vh" }}>
                  {nestedItem.cost}
                </Card.Header>
                <Card.Description>{nestedItem.quantity}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <p>
                  <Icon name="user" style={{ marginRight: "5%" }} />
                  by Retailer....
                </p>
                <Divider />
                <p>
                  <Icon name="clock" style={{ marginRight: "5%" }} />
                  { moment( moment(nestedItem.timestamp ,"LLL" ).format('YYYY-MM-DD') ).fromNow()}
                </p>
                
              </Card.Content></Link>
            </Card> 
             )) )
           }

     </Card.Group>
     </div>

       
         
     
    </div>)

    }
    
  }

    export default FoodItem ;





  


    

 

