import React from 'react';
import {
    Button,
    Table,Header , 
    Card,
    Image,
    Radio,
    Grid,
    Icon,
    Loader
  } from 'semantic-ui-react'

function Card1(props) {
    return (
        <Table fixed stackable style={{ marginTop: "4vh", marginBottom: "0vh" }}
      >
        <Table.Body>
         <Table.Row style={{background:"lightcoral" , color:"black"  }}>
          <Table.Cell width={8} style={{border:"4px solid black" , margin:"10px"}}>
            <Image 
              rounded fluid
              id="smallIMG"
              src={props.featureImage}
              verticalAlign="middle"/>
          </Table.Cell>
          <Table.Cell>
            
          <Header as='h2'>
    <Icon name='map marker' />
    <Header.Content>
      Village Name
      <Header.Subheader>20 km from the town</Header.Subheader>
    </Header.Content>
   </Header>

   <Header as='h2'>
    <Icon name='user' />
    <Header.Content>
      Retailer Name
      <Header.Subheader>Phone No</Header.Subheader>
    </Header.Content>
   </Header>
            

          </Table.Cell>

          

          <Table.Cell textAlign="center" width={2}>


          
            <Button size="small" color='blue' >
              <Icon name='close' />
              DELETE
            </Button> 
            
            

          </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
}

function VillageList() {
  return (
    <Grid  style={{marginLeft:"auto" ,marginRight:"auto", width:"70%"}} >
      <Grid.Column >
        <Card1
          featureImage="https://sebhastian.com/static/eb0e936c0ef42ded5c6b8140ece37d3e/fcc29/feature-image.png"
          title="How To Make Interactive ReactJS Form"
          description="Let's write some interactive form with React"
          link="https://sebhastian.com/interactive-react-form"
        />
      

        <Card1
          featureImage="https://sebhastian.com/static/4257b49310455388f3e155f8d5ab632e/fcc29/feature-image.png"
          title="Babelify your JavaScript code"
          description="Babel make JavaScript code browser-compatible."
          link="https://sebhastian.com/babel-guide"
        />
      
      
        <Card1
          featureImage="https://sebhastian.com/static/4d13c75e6afd3976800de29628da5ba5/fcc29/feature-image.png"
          title="JavaScript Basics Before You Learn React"
          description="Learn the prerequisites of learning React fast"
          link="https://sebhastian.com/js-before-react"
        />
      
    </Grid.Column>
    </Grid>
  );
}


export default VillageList;