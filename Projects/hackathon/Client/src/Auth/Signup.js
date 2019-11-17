import {
    Form,
    Grid,
    Loader,
    Divider,
    Message,
    Header
  } from "semantic-ui-react";

  import { Route,
    Link,
    BrowserRouter as Router , Redirect ,
    Switch} from 'react-router-dom'

  import React, { Component } from "react";
  import fire from "../firebase";
  import "../App.css";



  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]
  
  class Signup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user : "",  
        email: "",
        password: "",
        gender :  "",
        loading: true,
        error: false,
        loggedIn: true ,
        redirect: false
      };
    }
  
    // Form Handle
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
    };
  
    // Auth Change Listener
    componentDidMount = () => {
      fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loading: false, loggedIn: true , redirect: true });
        } else {
          this.setState({ loading: false, loggedIn: false });
        }
      });
    };
  
    signup = e => {
      this.setState({ loading: true, error: false });
      e.preventDefault();
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {
          this.setState({ loading: false , redirect : true });
        })
        .catch(error => {
          this.setState({ error: true, loading: false });
        });
    };
  
    render() {
      const {redirect} = this.state;
      if(redirect){
      return <Redirect push to="/profileInfo"/> } ;
      return (
        <Grid>
          <Grid.Column >
  
            {!this.state.loggedIn ?
            <div>
            <Header style={{ marginTop: "10vh", textAlign: "center" ,color:"white" }} as="h2">
                <Header.Content>  New User SignUp </Header.Content>
              </Header>
            </div>
            : null }
  
            {!this.state.loggedIn ? (
              <Form
                id="loginForm"
                style={{
                  maxWidth: 450 , 
                  marginLeft : "auto" ,
                  marginRight :"auto" 
                }}
              >
                <br />
  
                {this.state.error ? (
                    <Message negative>
                      <Message.Header>
                        The email you entered is already in use
                      </Message.Header>
                      <p>
                        Please choose another one or <a >login</a> to
                        your account.
                      </p>
                    </Message>
                ) : null}

                <br />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  type="text"
                  onChange={this.handleChange}
                  placeholder="UserName"
                  name="text"
                  autoComplete="username"
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  type="text"
                  onChange={this.handleChange}
                  placeholder="Email"
                  name="email"
                  autoComplete="username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  onChange={this.handleChange}
                  placeholder="Password"
                  name="password"
                  autoComplete="current-password"
                  type="password"
                />
               
  
                <div className="ui buttons fluid">
                  <button onClick={this.signup} className="ui button green">
                    Sign up for Social Master
                  </button>
                </div>
  
                <Divider hidden clearing />
                <p>
                  Your password must not contain spaces, special characters, or
                  emojis. By continuing you agree to our{" "}
                  <a href="#">terms of services</a>.
                </p>
              </Form>
            ) : null}
  
            {this.state.loggedIn ? (
              <p style={{ marginTop: "2%" }}>What are you looking for?</p>
            ) : null}
  
            {this.state.loading ? (
              <Loader style={{ marginTop: "5%" }} active inline="centered" />
            ) : null}
          </Grid.Column>
        </Grid>
      );
    }
  }
  
  export default Signup;