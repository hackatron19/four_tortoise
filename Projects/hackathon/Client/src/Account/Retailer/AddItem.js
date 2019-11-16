
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
  import fire from "../../firebase";




  const options = [
    { key: 'kg', text: 'Kilogram', value: 'kg' },
    { key: 'l', text: 'Litres', value: 'l' },
    { key: 'num', text: 'Count', value: 'num' },
  ]
  
  

  class AddItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
        loading: false,
        showEdit: false,
        fields: [ 
        ] ,
        loading : false
      };

  this.onClickButtonAdder = this.onClickButtonAdder.bind(this);
  this.onClickButtonSubmit = this.onClickButtonSubmit.bind(this);
  

}

onClickButtonAdder(event) {
    event.preventDefault();
     
    this.setState({
      fields: [{ product: "" , quantity : "" , type :  "" 
       , cost : 0  } , ...this.state.fields]
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

    this.setState({loading : true});

     let {currentUser} = fire.auth();
 this.state.fields.map((item , index) =>{ setInterval(

    fire
    .database()
    .ref(`foodItem/${currentUser.uid}/`)
    .push({
       product : item.product ,
       cost : item.cost ,
       quantity : item.quantity ,
       metric : item.type ,
       timestamp : Date.now(),
       retailer : this.props.peopleId
    })
    .then(() => {
      this.setState({
        loading: false
      });
    })
    .catch((e) =>{
        alert(e);
    }) , 500);

   })
    

  }
    
  
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
     
    };

    edit = index => {
        this.setState({ showEdit: !this.state.showEdit });
      };
    
  
  
    
  
  
    render() {
        
       
    return (
        
               <div>
              
                  <Button
                    color="green"
                    size="compact" fluid
                    onClick={() => this.edit()}
                  >
                    <Button.Content visible>
                      {this.state.showEdit
                        ?"DISABLE ADD ITEMS Mode": "ADD ITEMS MODE"
                        }
                    </Button.Content>
                  </Button>
                 
            
  
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

</div>
</Transition>


<br/> 
<Button primary onClick= {this.onClickButtonAdder} > Add More Form </Button>
<Button secondary onClick= {this.onClickButtonSubmit} > Post Form </Button>

</div>: null}

  
  

     {this.state.loading ? (
              <Loader style={{ marginTop: "5%" }} active inline="centered" />
            ) : null} 
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
         placeholder='Select Metric'
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
        
       

      </div>
    );
  }

  
  export default AddItem;