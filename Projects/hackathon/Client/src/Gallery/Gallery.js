
import React, { Component } from "react";
import fire from "../firebase";
import PropTypes from "prop-types";
import {
    Button,
  Container,
  Card,
  Icon,
  Image,
  Grid,
  Loader,
  Divider,
  Label,
  Form
  } from "semantic-ui-react";

  import DesktopContainer from '../Home/DesktopContainer';
  import MobileContainer from '../Home/MobileContainer';

  import { Route,
    Link,
    BrowserRouter as Router , 
    Switch} from 'react-router-dom';
    
    import moment from 'moment';

  
  class Gallery extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        list: [],
        keys: []
        
      };


    }
    componentDidMount = () => 
    {
     fire.database()
        .ref(`/gallery/`)
        .on("value", snapshot => {
          var obj = snapshot.val();
          var list = [];
          var keys = [];
          for (let a in obj) {
            list.push(obj[a]);
            keys.push(a);
          }
          this.setState({
            list: list,
            keys: keys,
            loading: false
          });
  
          
        });
  
        
    };

  

    render()
    { return(<div  ><ResponsiveContainer>
         <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{ backgroundColor: "#123445" }}>
        
        {this.state.loading ? (
              <div>
                <Loader style={{ marginTop: "25%" }} active inline="centered" />
              </div>
            ) : null}
            <div id="headerContainer" style={{width:"75%"}}>
            <Card.Group itemsPerRow={3} textAlign='center'  >
              { this.state.list.map((item, index) =>
           Object.values(item).map((nestedItem, nestedIndex) => (
            <Card   >
            <Image fluid style={{height:"400px" }} id="mainIMG" src={nestedItem.picture} />
          
              <Card.Content>
                <Label as="p" color="white" size="large" ribbon>
                  Score : {nestedItem.score}
                </Label>
                <Card.Header style={{ paddingTop: "2vh" }}>
                  {nestedItem.title}
                </Card.Header>
                <Card.Description>{nestedItem.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <p>
                  <Icon name="user" style={{ marginRight: "5%" }} />
                  by {nestedItem.user}
                </p>
                <Divider />
                <p>
                  <Icon name="clock" style={{ marginRight: "5%" }} />
                  { moment( moment(nestedItem.timestamp ,"LLL" ).format('YYYY-MM-DD') ).fromNow()}
                </p>
               
              </Card.Content>
            </Card>
             )) )
           }

     </Card.Group>
     </div>

       
     </Grid.Column>
     </Grid>
     </ResponsiveContainer>
    </div>
    )

    }
    
  }


  const ResponsiveContainer = ({ children }) => 
  (
  <div>
    <DesktopContainer  >{children }</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};
    

    export default Gallery ;
