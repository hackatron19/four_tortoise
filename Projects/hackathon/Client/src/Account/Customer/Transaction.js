import {
    Button,
    Form,
    Header,
    Input,
    Icon,
    Loader,
    Divider,
    Label,
    Dropdown,
    Transition,
    TextArea
  } from "semantic-ui-react";
import React, { Component } from "react";
  import fire from "../../firebase";



  class Transaction extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
        loading: false,
        showEdit: false,
      };

}

  
  

    edit = index => {
        this.setState({ showEdit: !this.state.showEdit });
      };
    
  
  
    
  
  
    render() {
        
       
    return (
        
               <div>
              
                  <Button
                    color="green"
                    size="compact" fluid
                    onClick={() => this.edit()}
                  >
                    <Button.Content visible>
                      {this.state.showEdit
                        ?"Close Transaction": "Open Transaction"
                        }
                    </Button.Content>
                  </Button>
                 
            
  
            {this.state.showEdit ?  
            <div> <h1>Transaction details</h1> </div> : null}
           

     {this.state.loading ? (
              <Loader style={{ marginTop: "5%" }} active inline="centered" />
            ) : null} 
          </div> 
        
      );
    }
  }



  

  
  export default  Transaction;