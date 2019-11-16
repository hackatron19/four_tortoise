import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Dropdown, Grid, Header } from 'semantic-ui-react'

const getOptions =  [
    { key: 'm',value: 'male', text: 'Male'  },
    { key: 'f', value: 'female' , text: 'Female' },
    { key: 'o', value: 'other' , text: 'Other' },
  ]

  class DropdownExampleRemote extends Component {
    state = {
        id1:{
      search: true,
      value: "",
      options: getOptions }
    }
  
    handleChange = (e, { value  , name}) => { e.preventDefault();
         this.setState( {  [name]: { ...this.state[name], value:  value}  })
        
        }
  
  
    render() {
      const {  options,  search, value } = this.state.id1
  
      return (
        <Grid>
          <Grid.Column width={8}>
            
            <Dropdown
              fluid
              selection
              name="id1"
              search={search}
              options={options}
              value={value}
              placeholder='Add Users'
              onChange={this.handleChange}
           
             
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header>State</Header>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </Grid.Column>
        </Grid>
      )
    }
  }
  
  export default DropdownExampleRemote
  
