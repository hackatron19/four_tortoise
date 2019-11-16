import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Grid,
  Dropdown,
  TextArea,
  Label,
  Icon,
  Dimmer,
  Loader
} from 'semantic-ui-react'

import fire from '../firebase';

import { Route,
  Link,
  BrowserRouter as Router , Redirect ,
  Switch} from 'react-router-dom'




const options = [
    { key: 'm',value: 'male', text: 'Male'  },
    { key: 'f', value: 'female' , text: 'Female' },
    { key: 'o', value: 'other' , text: 'Other' },
  ]

 const townOptions = [{value:"Mumbai" , text:"Mumbai"} , {value:"Chennai" , text:"Chennai"} , 
  {value:"Delhi" , text:"Delhi"}]  



class Urban extends Component {
    
    constructor(props){
        super(props);

        this.state= {
             type : "",
             uname:"" ,
             gender: "",
             contact: 12 ,
             town: "xxx",
             village : "xxx" ,
             address :"",
             image:"",
             profileComplete :false ,
             loading:false,
             redirect: false
          
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.handleDropDownChange =  this.handleDropDownChange.bind(this);
    }

    componentDidMount(){

      

    this.setState({type:this.props.type});

  
    }

    submit =  (e) =>{

      e.preventDefault();
      let {uname ,  profileComplete , gender , address ,
           contact ,  village , town , type  , image    } = this.state ;

      let {loggedIn , email} = this.props;    
   
      this.setState({loading : true });

      if(loggedIn)
      {fire
        .database()
        .ref(`people/`)
        .push({
          name:this.state.uname ,
           profileComplete:this.state.profileComplete ,
            gender :this.state.gender ,
             address:this.state.address ,
           contact:this.state.contact , 
            village:this.state.village , 
            town : this.state.town,
             type:this.state.type  ,
              image : this.state.image ,
              email:email
        })
        .then(() => {
          this.setState({
            loading : false , profileComplete: true , redirect:true
          });
          console.log("Done");
        })
        .catch(()=>{
          alert("Some Error Occurs");
        });
      }
      else{
        this.setState({loading:false});
      }
    
  
    }


    handleChange = e => {
        e.preventDefault();
      this.setState( { [e.target.name] : e.target.value } );
      console.log(this.state);
    };

    handleDropDownChange = (e, { value  , name}) => { e.preventDefault();
      this.setState({  [name] :  value})
     
     }


    render(){
         if(this.state.redirect)
         {return <Redirect push to="/"/> }
           
         

        return(<div>
             <div style={{ backgroundColor: "lightcoral", borderRadius:"2%" ,
    marginRight: "10vh", marginLeft: "10vh",padding:"5px", marginTop:"5vh" , height:'auto' }}>
       <h1 style={{color:"#123445" , textAlign:"center"}} > ADD Profile Info <b > {this.props.type}</b> </h1>
        
      <Form>
        <Form.Group widths='equal'>
        <Form.Input fluid label='User name' name = "uname" type="text"
            onChange={this.handleChange} required /> 

        </Form.Group>
        <Form.Group  widths='equal' style={{width:"45%"}}>
         
         <Form.Dropdown
              fluid
              selection
              name="gender"
              label="Gender"
              required
              options={options}
              value={this.state.gender}
              placeholder='Gender'
              onChange={this.handleDropDownChange}
            />
            </Form.Group>


        <Form.Group widths='equal' style={{width:"45%"}} >
           
          <Form.Dropdown
              fluid
              selection  
              label ="Town" 
              name="town"
              search={true}
              required
              options={townOptions}
              value={this.state.town}
              placeholder='Town'
              onChange={this.handleDropDownChange}
            />
        </Form.Group>
      
      
       
        <Form.Group widths='equal'  style={{width:"33%"}} >
         <Form.Input label='Contact No.'
         required 
          placeholder='XXX'  type="number" name="contact" onChange={this.handleChange}/>
        </Form.Group>

        <Form.Input label='Picture Src' type='text'
          name="image" onChange={this.handleChange}/>
        
        <Form.TextArea label=' Full Adress'
        required
         name="address" placeholder=' Full Address'onChange={this.handleChange} />
 
        <Form.Button type="submit" onClick={this.submit} >Submit</Form.Button>
          
      </Form>

      {this.state.loading ? <Loader active > Loading </Loader>: null}

      <br/>

     
      
      </div>
        </div>)
    }


}

export default Urban;