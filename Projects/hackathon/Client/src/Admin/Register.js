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
  Loader
} from 'semantic-ui-react'

import Axios from 'axios';


const options = [
    { key: 'm', value: 'male', text: 'Male'  },
    { key: 'f', value: 'female' , text: 'Female' },
    { key: 'o', value: 'other' , text: 'Other' },
  ]



class ResisterRetailer extends Component {
    
    constructor(props){
        super(props);

        this.state= {
            list: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit =  (e) =>{
      e.preventDefault();
    }

    handleChange = e => {
        e.preventDefault();
      //this.setState( { [e.target.name] : e.target.value } );
      console.log(this.state);
    };

    componentDidMount(){


    }

    


    render(){
        return(<div>
             <div style={{ backgroundColor: "lightcoral", borderRadius:"2%" ,
         marginRight: "10vh", marginLeft: "10vh",padding:"15px", marginTop:"10vh" , height:'auto' }}>
       <h1 style={{color:"blue"}} > Register Retailer  </h1>
         
   


      <Form>
        <Form.Group widths='equal'>
        <Form.Input fluid label='User name' name = "uname" type="text"
            onChange={this.handleChange} required /> 
         
           <Form.Select
            fluid
            label='Gender'
            options={options}
            placeholder='Gender'
            name='gender'
            onChange={this.handleChange}
          />
        </Form.Group>

        <h3>Date OF Birth</h3>
      
        <Form.Group widths='equal' style={{width:"33%"}} >
          <Form.Input fluid label='DD'  type='number' placeholder='DD' name="dd" onChange={this.handleChange} />
          <Form.Input fluid label='MM'  type='number' placeholder='MM' name="mm" onChange={this.handleChange} />
          <Form.Input fluid label='YYYY'  type='number' placeholder='YYYY' name="yyyy" onChange={this.handleChange}/>
        </Form.Group>


        <h3>Contact</h3>
        <Form.Group widths='equal'  style={{width:"33%" , marginLeft:"5px"}} > 
         <Input label='+91'  placeholder='XXX'  type="number" name="contact" onChange={this.handleChange}/>
        </Form.Group>

        <Form.Input style={{width:"30%" , marginLeft:"5px"}} label='Picture' type='file'  name="image" onChange={this.handleChange}/>

        <Form.Group widths='equal'>
        <Form.Select
            fluid
            label='Distict'
            options={options}
            placeholder='Distict'
            name='dist'
            onChange={this.handleChange}
          />
         
           <Form.Select
            fluid
            label='Village'
            options={options}
            placeholder='Village Name'
            name='vill'
            onChange={this.handleChange}
          />
        </Form.Group>


        profileinfo
        <Form.TextArea label='About' name="about" placeholder='Tell us more about you...'onChange={this.handleChange} />
 
        <Form.Button type="submit" onClick={this.submit} >Submit</Form.Button>
          
      </Form>

      <br/>

     
      
      </div>
        </div>)
    }


}

export default ResisterRetailer;