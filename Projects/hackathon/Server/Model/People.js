const Joi = require('joi');
const mongoose = require('mongoose');


  const peopleSchema =  new mongoose.Schema({
    
    type: {
      type: String,
      required: true, 
    },
    email : { type:String ,
      required : true
    } ,
    authUid  : {
      type:String ,
      required : true
    } ,

    profileComplete : { type: Boolean ,
      required : true
    } ,

    
      name:{ type:String , require : true} ,
      village: { type:String , require : true} ,
      town:{ type:String , require : true} ,
      contact : { type:String , require : true}  ,
      gender : { type:String } ,
      address: {type:String , require :true}

     


    
  });

const People = mongoose.model('people',peopleSchema);

function validatePeople(people) {
  const schema = {
    uname:Joi.string().required()

   
  };

  return Joi.validate(people, schema);
}

module.exports = { peopleSchema ,People , validatePeople};