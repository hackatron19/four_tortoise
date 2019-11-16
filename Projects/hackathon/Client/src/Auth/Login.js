import { Route,
    Link,
    BrowserRouter as Router , Redirect ,
    Switch} from 'react-router-dom'

import {
    Form,
    Grid,
    Loader,
    Divider,
    Header,
    Message
  } from "semantic-ui-react";

  import React, { Component } from "react";
  import fire from "../firebase";
  import "../App.css";
  
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        loading: true,
        error: false,
        loggedIn: false,
        redirect: false
      };

      this.login = this.login.bind(this);
    }
  
    
    componentDidMount = () => {

      fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loading: false, loggedIn: true , redirect : true });
        } else {
          this.setState({ loading: false, loggedIn: false });
        }
      });
    };
  
    login = (event) => {
      this.setState({ loading: true, error: false });
      event.preventDefault();
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {
          this.setState({ loading: false , redirect: true });
          //  this.props.history.push("/");
        })
        .catch(error => {
          this.setState({ error: true, loading: false });
        });
    };
    
   
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    render() {
      const {redirect} = this.state;
      if(redirect){
      return <Redirect push to="/"/> } ;
     
      return (
        <Grid  >
          <Grid.Column>
            {!this.state.loggedIn ? (
              <Header style={{ marginTop: "10vh", textAlign: "center" ,color:"white" }} as="h2">
                <Header.Content> Log in to your account </Header.Content>
              </Header>
            ) : null}
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
                  <div>
                    <Message negative>
                      <Message.Header>
                        Please double-check and try again
                      </Message.Header>
                      <p>The password you entered did not match our records.</p>
                    </Message>
                  </div>
                ) : null}

                <br />
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
                  <button onClick={this.login} className="ui button green">
                    Log in
                  </button>
                </div>
                
                <h4 style={{textAlign:"center", color:"white"}} > Forgat Password ...</h4>
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
  
  export default Login;