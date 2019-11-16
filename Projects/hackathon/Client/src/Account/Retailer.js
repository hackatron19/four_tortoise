
import {
    Button,
    Form,
    Header,
    Input,
    Icon,
    Loader,
    Divider,
    Label,
    Dropdown,
    Transition,
    TextArea
  } from "semantic-ui-react";


import { Route,
    
    BrowserRouter as Router , 
    Switch} from 'react-router-dom'
    
  import React, { Component } from "react";
  import fire from "../firebase";
  import "../App.css";


  const options = [
    { key: 'kg', text: 'Kilogram', value: 'kg' },
    { key: 'l', text: 'Litres', value: 'l' },
    { key: 'num', text: 'Count', value: 'num' },
  ]
  
  

  class Retailer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
        loading: true,
        loggedIn: true,
        showSetting: false,
        showEdit: false,
        fields: [ 
        ]
      };

  this.onClickButtonAdder = this.onClickButtonAdder.bind(this);
  this.onClickButtonSubmit = this.onClickButtonSubmit.bind(this);
  

}

onClickButtonAdder(event) {
    event.preventDefault();
     
    this.setState({
      fields: [{ product: "" , quantity : "" , type :  "" 
       , cost : 0 , image:"" , description :"" } , ...this.state.fields]
    });

  }



  onClickFormGroupButton(index) {
    let fields = [...this.state.fields];
    fields.splice(index, 1);
    this.setState({ fields });
  }

  onChangeFormGroupInput(index, e) {
      e.preventDefault();
    let f = [...this.state.fields];
    
   
   f[index][e.target.name]=e.target.value;
    
    
    this.setState({fields:f},()=>{
        console.log(this.state.fields)
    });
   
    
  }

  onChangeDropDown(index,  e ){
      e.preventDefault();
      let f = [...this.state.fields];

     

      f[index].type = options[index].value

      this.setState({fields:f},()=>{
        console.log(this.state.fields)
    });

  }

  onClickButtonSubmit(event) {
    event.preventDefault();
    console.log(this.state.fields);
  }
    
  
    // Auth Change Listener
    componentWillMount = () => {
      fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loggedIn: true, showSetting: true , loading:false });
         
        } else {
          this.setState({ loading: false, loggedIn: false });
        }
      });
    };
  
    // Form Handler
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    edit = index => {
        this.setState({ showEdit: !this.state.showEdit });
      };
    
  
  
    
  
  
    render() {
       
    return (
        <div style={{
            backgroundColor: "#f9f9f9",
            marginTop: "0vh",
            minHeight: "100vh"
          }}
        >
          <div
            id="headerContainer"
            style={{ marginTop: "0vh", minHeight: "100vh" }}
          >
            
            {this.state.loggedIn ? (
              <div>
                <Header as="h2" style={{ paddingTop: "3vh", marginTop: "0vh" }}>
                  <Icon name="setting" />
                  <Header.Content>Manage Account</Header.Content>
                </Header>
                <Divider />
  
               
                {this.state.showSetting ? (
                  <Button
                    color={this.state.showEdit ? "white" : "green"}
                    size="small"
                    onClick={() => this.edit()}
                  >
                    <Button.Content visible>
                      {this.state.showEdit
                        ? "ADD ITEMS MODE"
                        : "ENABLE ADD ITEMS"}
                    </Button.Content>
                  </Button>
                ) : null}
              </div>
            ) : null}
  
            {this.state.showEdit ?  
            <div>
            <Transition
           visible={this.state.showEdit}
            animation="fade"
            duration={400}
          > 

<div style={{width:"75%" ,marginLeft:"auto" , marginRight:"auto" }}>

<fieldset id="buildyourform">
<legend>Build your own form!</legend>
{this.state.fields.map((value, index) => (
      <FormGroup
        inputChange={this.onChangeFormGroupInput.bind(this, index)}
        dropdown={this.onChangeDropDown.bind(this,index )}
        buttonClick={this.onClickFormGroupButton.bind(this, index)}
        
        value={value}
        key={index}
      />
    ))}

 

</fieldset>

<br/>
<Button primary onClick= {this.onClickButtonAdder} > Add Form </Button>
<Button secondary onClick= {this.onClickButtonSubmit} > Preview </Button>





    </div>
          
          
          
          </Transition>
          </div>: null}
            
              
           
  
            {this.state.loading ? (
              <Loader style={{ marginTop: "5%" }} active inline="centered" />
            ) : null}
          </div>
        </div>
      );
    }
  }



  function FormGroup(props) {
    return (
      <div>
        
        <Input
          type="text"
          label="Name"
          name="product"
          placeholder="Product"
          value={props.value.product}
          onChange={props.inputChange}
        />
         <Input
          label="Quantity"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={props.value.quantity}
          onChange={props.inputChange}
        />
        <Input
          label="Cost"
         type="number"
         name="cost"
         placeholder="Cost Of Products"
         value={props.value.cost}
         onChange={props.inputChange}
       />
            <Dropdown 
         placeholder='Select Subject'
         name="type"
         onChange={props.dropdown}
         selection 
         options={options} 
         value={props.value.type}
         />

           <Button
           negative
          size="large"
          onClick={props.buttonClick}
          disabled={props.buttonDisabled}
          tabIndex="-1"

         
        ><Icon name="cancel" /></Button>
        
       
        <Divider/>
        <Input
         label="Image"
         type="text"
         name="image"
         placeholder="Image Src" 
         value={props.value.image}
         onChange={props.inputChange}
       />
       <Divider/>
       <TextArea
          label="Description"
         type="text"
         name="description"
         placeholder="Description"
         value={props.value.description}
         onChange={props.inputChange}
       />
        
      


      </div>
    );
  }

  
  export default Retailer;