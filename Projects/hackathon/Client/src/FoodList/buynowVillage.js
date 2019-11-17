import React ,{Component} from 'react'
import moment from "moment";
import fire from '../firebase'

import {
  Button,
  Container,
  Card,
  Header,
  Image,
  Grid,
  Loader,
  Icon,
  Dimmer,
  Divider,
  Form ,
  Comment,
  GridColumn
} from "semantic-ui-react";




var qs = require('querystringify');




class ShowPost extends Component {

    constructor(props) {
        super(props);
        this.state = { key1:"" , key2:"" ,  loading :true,

    };
     
      }


    render() {
       return <div >
         {this.state.loading ? 
      <Loader>Loading</Loader>
     : <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
         <Grid.Column   style={{ backgroundColor: "#123445" }}>

     <Header as="h2" style={{ paddingTop: "3vh", marginTop: "0vh" ,color:"white" }}>
                  <Icon name="image" />
                  <Header.Content>this.state.details.title</Header.Content>
                </Header>

                <Divider />

              
      </Grid.Column>
      </Grid>}
  </div>
    }
  }

  export default ShowPost;