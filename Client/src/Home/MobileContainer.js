import PropTypes from "prop-types";
import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";


class MobileContainer extends Component {
    state = {};
  
    handlePusherClick = () => {
      const { sidebarOpened } = this.state;
  
      if (sidebarOpened) this.setState({ sidebarOpened: false });
    };
  
    handleToggle = () =>
      this.setState({ sidebarOpened: !this.state.sidebarOpened });
  
    render() {
      const { children } = this.props;
      const { sidebarOpened } = this.state;
  
      return (
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation="uncover"
              inverted
              vertical
              visible={sidebarOpened}
            >
              <Menu.Item as="a" active>
                Home
              </Menu.Item>
              <Menu.Item as="a">Work</Menu.Item>
              <Menu.Item as="a">Company</Menu.Item>
              <Menu.Item as="a">Careers</Menu.Item>
              <Menu.Item as="a">Log in</Menu.Item>
              <Menu.Item as="a">Sign Up</Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher
              dimmed={sidebarOpened}
              onClick={this.handlePusherClick}
              style={{ minHeight: "100vh" }}
            >
              <Segment
                inverted
                textAlign="center"
                style={{ minHeight: 350, padding: "1em 0em", backgroundImage:"https://www.nationalgeographic.com/content/dam/environment/photos/future_of_food/organic_farming_rough/01_organic_farming_i8860_20181003_11260.adapt.1900.1.jpg"}}
                vertical
              >
                <Container>
                  <Menu inverted pointing secondary size="large">
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Item position="right">
                      <Button as="a" inverted>
                        Log in
                      </Button>
                      <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                        Sign Up
                      </Button>
                    </Menu.Item>
                  </Menu>
                </Container>
                {/* <HomepageHeading mobile /> */}
              </Segment>
  
              {children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Responsive>
      );
    }
  }
  
  MobileContainer.propTypes = {
    children: PropTypes.node
  };


  export default MobileContainer;