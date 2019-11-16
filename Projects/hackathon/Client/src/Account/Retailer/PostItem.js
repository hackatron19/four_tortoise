
import {
    Button,
    Form,
    Header,
    Image,
    Icon,
    Loader,
    Divider,
    Label,
    Table,
    Transition , Grid
  } from "semantic-ui-react";
  import React, { Component } from "react";
  import fire from "../../firebase";
 

  
  class PostItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showSetting :  false ,
        loading: false,
        showPostItem: false,
        list: [],
        keys:[],
        quantity : 0 ,
        cost : 0 ,
        modal: 0
      
      

      };

      this.account = this.account.bind(this);
    }

    componentDidMount(){


        this.account();
    }
  
    
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
    };
  
   
    account = () => {
      const { currentUser } = fire.auth();
      fire
        .database()
        .ref(`foodItem/${currentUser.uid}/`)
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
            loading: false
          } , () => console.log(list));
        });
    };
  
    delete = index => {
   
      const { currentUser } = fire.auth();
      fire
        .database()
        .ref(`feed/${currentUser.uid}/${this.state.keys[index]}`)
        .remove();
    };
  
    edit = (item, index) => {
      
      this.setState({ showPostItem: !this.state.showPostItem , modal : index ,
         cost :item.cost ,
         quantity :item.quantity, 
       });

        console.log(this.state)
    };

    showSetting = () =>{
        this.setState({showSetting: !this.state.showSetting});
    }
  
    update = (index) => {
      const { currentUser } = fire.auth();
  
      this.setState({ loading: true });
      fire
        .database()
        .ref(`foodItem/${currentUser.uid}/${this.state.keys[index]}`)
        .update({
          cost: this.state.cost,
          quantity: this.state.quantity
        })
        .then(() => {
          this.setState({
            loading: false
          });
        })
        .catch((err) =>
        console.error(err));
    };
  
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
              
                <Button size="small" color='blue' onClick={() => this.delete(index)}>
                  <Icon name='close' />
                  DELETE
                </Button> 
                <Divider/>


                {this.state.showSetting ?
                   <Button size="small"color={this.state.showPostItem ? "white" : "yellow"}
                    onClick={() => this.edit(item ,index)}>
                  <Button.Content visible>
                  <Icon name='pencil' />
                      {this.state.showPostItem
                        ? "DISABLE EDIT"
                        : "ENABLE EDIT"}
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
        onChange={this.handleChange}
        name="cost"
        label ="New Cost"
      />
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
      onClick={() => this.update(index)}
    >
      <Label as="span" color="black">
        UPDATE
      </Label>
      <Button color="yellow" icon compact>
        <Icon name="pencil" color="black" />
      </Button>
    </Button>
  </Form>
</Transition>
        
       
        </div>
      ));

      return (
        <div >
            <Button
                    color="green"
                    size="compact" fluid
                    onClick={() => this.showSetting()}
                  >
                    <Button.Content visible>
                      {this.state.showSetting
                        ? "DISABLE ADD ITEMS Mode": "ADD ITEMS MODE"
                        }
                    </Button.Content>
                  </Button>
            {this.state.showSetting ? <div>{listItems}</div> : null}
            {this.state.loading ? (
              <Loader style={{ marginTop: "5%" }} active inline="centered" />
            ) : null}
          </div>
       
       
      );
    }
  }



       
  
  export default PostItem;







  