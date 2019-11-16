
import React, { Component } from "react";
import moment from "moment";
import fire from '../firebase';



import { Route,
  Link,
  BrowserRouter as Router , 
  Switch} from 'react-router-dom'


import {
  Button,
  Container,
  Icon,
  Image,
  Header,
  Grid,
  Loader,
  Divider,
 
  Form ,
 
} from "semantic-ui-react";
import "../App.css";

class Addphoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title: "",
      description: "",
      picture: "",
    
      showArticle: false ,
     
    };

    this.handleChange =  this.handleChange.bind(this);
    this.showArticle =  this.showArticle.bind(this);
   
   
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  showArticle = () => {
    this.setState({ showArticle: !this.state.showArticle });
  };

  // POST Function
  new = e => {
    this.setState({ loading: true, showArticle: false });
    e.preventDefault();
    
    let title = this.state.title;
    let description = this.state.description;
    let picture = this.state.picture;
    let score = 0;
    let timestamp = moment().format("LLL");
    const { currentUser } = fire.auth();

    fire
      .database()
      .ref(`feed/${currentUser.uid}/`)
      .push({
        title,
        description,
        picture,
        score,
        timestamp,
        user: currentUser.email
      })
      .then(() => {
        this.setState({
          loading: false
        });
      });
  };

 



  render() {
   return (
      <div >
       

     <div style={{paddingTop: '2vh', paddingBottom: '2vh'}}>
                {!this.state.showArticle ? (
                  <Button
                    color="green"
                    fluid
                    onClick={this.showArticle}
                    size="compact"
                  >
                    CREATE NEW POST
                  </Button>
                ) : null}
              </div>
          

            {this.state.showArticle ? (
              <Container fluid style={{paddingBottom: '4vh' }}>
                <Header as="h2" style={{ paddingTop: "3vh", marginTop: "0vh" ,color:"white" }}>
                  <Icon name="save" />
                  <Header.Content>New Post</Header.Content>
                </Header>

                <Divider />
                  <Form >
                  <Form.Group widths="equal" >
                    <Form.Input
                      fluid
                      value={this.state.title}
                      onChange={this.handleChange}
                      name="title"
                      label="A cool title"
                      required
                    />
                    <Form.Input
                      fluid
                      value={this.state.picture}
                      onChange={this.handleChange}
                      name="picture"
                      label="Picture URL"
                      required
                    />
                  </Form.Group>
                  <Form.TextArea
                    autoHeight
                    rows={4}
                    value={this.state.description}
                    onChange={this.handleChange}
                    name="description"
                    label="What's on your mind?"
                    required
                  />
                  <Button
                    animated="vertical"
                    color="black"
                    size="small"
                    onClick={this.new}
                  >
                    <Button.Content visible>SUBMIT</Button.Content>
                    <Button.Content hidden>
                      <Icon name="plus" />
                    </Button.Content>
                  </Button>

                  <Button
                    id="formBTN"
                    animated="vertical"
                    color="white"
                    size="small"
                    onClick={this.showArticle}
                  >
                    <Button.Content visible>CANCEL</Button.Content>
                    <Button.Content hidden>
                      <Icon name="cancel" />
                    </Button.Content>
                  </Button>
                </Form>
              </Container>
            ) : null}

          
            {this.state.load ? (
              <div>
                <Loader style={{ marginTop: "25%" }} active inline="centered" />
              </div>
            ) : null}

         
        
      </div>
    );
  }
}

export default Addphoto;




//  snapshot.forEach(function(data) {
  //console.log("The " + data.key + " dinosaur's score is " + data.val());
// });