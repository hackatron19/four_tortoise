
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
    Transition
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

  
  class Account extends Component {
    constructor(props) {
      super(props);
      this.state = { fields: [ 
      ] };
  this.onClickButtonAdder = this.onClickButtonAdder.bind(this);
  this.onClickButtonSubmit = this.onClickButtonSubmit.bind(this);
  

}

onClickButtonAdder(event) {
    event.preventDefault();
     
    this.setState({
      fields: [{ product: "" , quantity : "" , type :  "" } , ...this.state.fields]
    });

    console.log(this.state.fields);
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
                        ? "DISABLE EDIT MODE"
                        : "ENABLE EDIT MODE"}
                    </Button.Content>
                  </Button>
                ) : null}
              </div>
            ) : null}
  
            {/* CONTAINER */}
            {this.state.showEdit ?  
            <div>
            <Transition
           visible={this.state.showEdit}
            animation="drop"
            duration={400}
          >

<div style={{width:"50%" ,marginLeft:"auto" , marginRight:"auto" }}>

<fieldset id="buildyourform">
<legend>Build your own form!</legend>
{this.state.fields.map((value, index) => (
      <Form.Group
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

<form onSubmit={this.ImageUpload} > 
<input type="file" name="myImage" accept="image/*" />
<input type="submit" value="Upload Photo"/>
</form>



    </div>
            
               
          </Transition>
        </div> : null }
           
  
            {/* SPINNER */}
            {this.state.loading ? (
              <Loader style={{ marginTop: "5%" }} active inline="centered" />
            ) : null}
          </div>
        </div>
      );
    }
  }
  
  export default Account;