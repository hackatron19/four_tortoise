import React, { Component } from "react";

import {
    
  Grid,
  Button , Select , Icon , Input , Dropdown
  
  } from "semantic-ui-react";

  import Axios from 'axios';

  const options = [
    { key: 'kg', text: 'Kilogram', value: 'kg' },
    { key: 'l', text: 'Litres', value: 'l' },
    { key: 'num', text: 'Count', value: 'num' },
  ]

  
 
  class test1 extends Component {
    constructor(props) {
      super(props);
      this.state = { fields: [ 
          ] };
      this.onClickButtonAdder = this.onClickButtonAdder.bind(this);
      this.onClickButtonSubmit = this.onClickButtonSubmit.bind(this);
      this.ImageUpload = this.ImageUpload.bind(this);

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

     ImageUpload(){
       


     }


    render(){
        return ( <div style={{width:"50%" ,marginLeft:"auto" , marginRight:"auto" }}>

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

  <form onSubmit={this.ImageUpload} > 
  <input type="file" name="myImage" accept="image/*" />
  <input type="submit" value="Upload Photo"/>
   </form>



        </div> )
    }
}


  
  function FormGroup(props) {
    return (
      <div>
        <Input
          type="text"
          name="product"
          placeholder="Product"
          value={props.value.product}
          onChange={props.inputChange}
        />
         <Input
         
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={props.value.quantity}
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
        
        
        <button
          
          type="button"
          onClick={props.buttonClick}
          disabled={props.buttonDisabled}
          tabIndex="-1"
         
        ><Icon name="cancel" /></button>
      </div>
    );
  }








export default test1;