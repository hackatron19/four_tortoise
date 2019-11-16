
const Joi = require('joi');
const mongoose = require('mongoose');


  const townSchema =  new mongoose.Schema({
    
    
    name : { type:String ,
      required : true
    } ,

    long : {
        type:String
    } ,

    lat :{

        type:String
    }
   


    
  });

const Town = mongoose.model('town',townSchema);

function validateTown(town) {
  
    

}

module.exports = { townSchema ,Town , validateTown};