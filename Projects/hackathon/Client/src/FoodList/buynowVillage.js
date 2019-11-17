import React ,{Component} from 'react'
import moment from "moment";
import fire from '../firebase'

import {
  Button,
  Container,
  Card,
  Header,
  Image,
  Grid,
  Loader,
  Icon,
  Dimmer,
  Table ,
  Transition , Label,
  Form ,
  Comment,
  GridColumn,
  Divider
} from "semantic-ui-react";
import Retailer from '../Account/Retailer/Retailer';






var qs = require('querystringify');




class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = { key1:"" , key2:"" ,  loading :false,
        quantity:0,
        
        showSetting :  false ,
        
        showPostItem: false,
        list: [],
        keys:[],
        cart:[] ,

        retailer:{
          name:"" ,
          contact : "",
          village: ""
        } ,

        custUid:"" ,
        modal: 0 ,
        bill : false

       
    
    };
     this.account= this.account.bind(this);
     this.back = this.back.bind(this).bind(this);
     this.retailerDetails = this.retailerDetails.bind(this);
     this.billbool = this.billbool.bind(this);
     
    
      }


      handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value}  );
      }

     


    back = () =>
    { this.props.history.push("/");
    }

    account = (id) => {
      const { currentUser } = fire.auth();
      fire
        .database()
        .ref(`foodItem/${id}/`)
        .on("value", snapshot => {
          var obj = snapshot.val();
          var list = [];
          var keys = [];
          for (let a in obj) {
            list.push(obj[a]);
            keys.push(a);
          }
          
          this.setState({
            list: list,
            keys: keys,
            loading: false ,
           
          } , () => this.retailerDetails( list[0].retailer));
        });
    };

    edit = (item, index) => {
      
      this.setState({ showPostItem: !this.state.showPostItem , modal : index ,
         cost :item.cost ,
       });

        console.log(this.state)
    };

    showSetting = () =>{
        this.setState({showSetting: !this.state.showSetting});
    }

    billbool = ()=>{
      
      this.setState({bill :  !this.state.bill})

    }

    update =(item , index) =>{

       let cartmenu  = { product : item.product ,
        cost : item.cost , quantity : this.state.quantity ,
           metric : item.metric  , foodid: Object.keys(item) }
       let  list = this.state.list;
       list[index].quantity = list[index].quantity - this.state.quantity; 
        let cart = this.state.cart;
        cart.push(cartmenu);
        this.setState({cart:cart   , list : list , quantity : 0 } , () => console.log(this.state.cart));
    } 


    retailerDetails = (id ) => {
     
        fire
        .database()
        .ref(`people/${id}`)
        .on("value", snapshot => {
          var obj = snapshot.val();
           let retailer = { name : obj.name ,
             village : obj.village ,
            contact : obj.contact } ;

          this.setState({retailer : retailer } ,() => console.log(this.state.retailer));
        } )


    }

   
     
      
   componentWillMount (){


    var {id} = qs.parse(this.props.match.params.id); 
    var {id2} = qs.parse(this.props.match.params.id2); 
    this.account(id);    
    this.setState({ key1: id , key2: id2  ,loading :false});


   }



    render() {

      const listItems = this.state.list.map((item, index) => (
        <div>
          <Table fixed stackable
            style={{ marginTop: "4vh", marginBottom: "0vh" }}
          >
            <Table.Body>
             <Table.Row style={{background:"lightcoral" , color:"black"  }}>
              <Table.Cell width={4} >
               <h2>{item.product}</h2>
              </Table.Cell>
  
              <Table.Cell width={3}>
                <h2>Quantity : {item.quantity}</h2>
              </Table.Cell>
              <Table.Cell width={4}>
                <h3> Cost per {item.metric} :Rs. {item.cost}</h3>
              </Table.Cell>
             
  
              <Table.Cell textAlign="center" width={3}>
              
  
                {this.state.showSetting ?
                   <Button size="small"color={this.state.showPostItem ? "white" : "yellow"}
                    onClick={() => this.edit(item ,index)}>
                  <Button.Content visible>
                  <Icon name='pencil' />
                      {this.state.showPostItem
                        ? "DISABL BUY EDIT"
                        : "ENABLE BUY MODE"}
                    </Button.Content>
                </Button> : null }
  
              </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
  
          <Transition
  visible={this.state.showPostItem && this.state.modal === index}
  animation="vertical flip"
  duration={400}
  >
  <Form
    style={{
      paddingBottom: "8vh",
      paddingTop: "2vh"
    }}
  >
    <Form.Group widths="equal">
     
      <Form.Input
        fluid
        onChange={this.handleChange}
        name="quantity"
        label ="Quantity"
        required
      />
    </Form.Group>
   
    <Button as="div" compact
      labelPosition="left"
      size="large"
       onClick={() => this.update(item , index)}
    >
      <Label as="span" color="black">
        Add To Cart
      </Label>
      <Button color="yellow" icon compact>
        <Icon name="shop" color="black" />
      </Button>
    </Button>
  </Form>
  </Transition>
        
       
        </div>
      ));


      

      const cartlist = this.state.cart.map((item, index) => (
        <div>
          
          <Table fixed stackable
            style={{ marginTop: "4vh", marginBottom: "0vh" }}
          >
            <Table.Body>
             <Table.Row style={{background:"lightcoral" , color:"black"  }}>
              <Table.Cell width={4} >
               <h2>{item.product}</h2>
              </Table.Cell>
  
              <Table.Cell width={3}>
                <h2>Quantity : {item.quantity}</h2>
              </Table.Cell>
              <Table.Cell width={4}>
                <h3> Cost per {item.metric} :Rs. {item.cost}</h3>
              </Table.Cell>
             
  
              <Table.Cell textAlign="center" width={3}>
                
                   <Button size="small"color={this.state.showPostItem ? "white" : "yellow"}
                    // onClick={() => this.removeCartItem(item.foodid , index)}
                    >
                  <Button.Content visible>
                  <Icon name='remove' />
                    Remove
                    </Button.Content>
                </Button> 
  
              </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          </div>
      ));

      
      

       return <div>

       {this.state.loading ? (
        <Loader style={{ marginTop: "5%" }} active inline="centered" />
      ) : null}
       
       <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
         <Grid.Column id="headerContainer"   style={{ backgroundColor: "#123445" }}>
          <Button
                  color="green"
                  size="compact" fluid
                  onClick={() => this.showSetting()}
                >
                  <Button.Content visible>
                    {this.state.showSetting
                      ? "DISABLE BUY ITEMS MODE": "BUY ITEMS MODE"
                      }
                  </Button.Content>
                </Button>
          {this.state.showSetting ? <div>{listItems} <Divider/> 
          <h1>Cart Menu</h1>
           {cartlist}</div> : null}


           <Button float negative onClick={this.billbool} >  Order Here </Button>
           {this.state.bill ? <Billing cart={this.state.cart} 
            retailer={this.state.retailer} list={this.state.list} /> : null }
           
    
      <Button positive onClick={this.back} > Back</Button>
      </Grid.Column>
      </Grid>
      </div>
 
    }
  }

  export default Welcome;


const Billing = (props) => {



} 

