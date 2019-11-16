
const Joi = require('joi');
const mongoose = require('mongoose');


  const villageSchema =  new mongoose.Schema({
    
    
    name : { type:String ,
      required : true
    } ,

    long : {
        type:String
    } ,

    lat :{

        type:String
    } ,
    dist:{
        type:Number,
        require:true
    }
 ,
    retailer : [ { id : {type:String} }
    ]
    
  });

const Village = mongoose.model('village',villageSchema);

function validateVillage(village) {
  
    

}

module.exports = { townSchema ,Village , validateVillage};