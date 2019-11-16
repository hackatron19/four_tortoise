 
const {People, validatePeople} = require('../Model/People'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

  console.log("Starting Get Request for People");
  const peoples = await People.find().sort('email');
  res.send(peoples);
});





router.post('/', async (req, res) => {

  //  const { error } = validatePeople(req.body); 
  //  if (error) return res.status(400).send(error.details[0].message);

   console.log(req.body);

  let people = new People({ 
    email: req.body.email,
    type: req.body.type,
    authUid: req.body.authUid ,
    profileComplete :true,
     name : req.body.uname ,
           village : req.body.village ,
           town :  req.body.town ,
           contact : req.body.contact ,
           address: req.body.address ,
           gender : req.body.gender
    
  });
  people = await people.save();
  
  res.send(people);
});



////////// Need to Update Down api.... /////


router.put('/:id', async (req, res) => {
  const { error } = validatePeople(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const people = await People.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true });

  if (!people) return res.status(404).send('The people with the given ID was not found.');
  
  res.send(people);
});

router.delete('/:id', async (req, res) => {
  const people = await People.findByIdAndRemove(req.params.id);

  if (!people) return res.status(404).send('The people with the given ID was not found.');

  res.send(people);
});

router.get('/:id', async (req, res) => {
  const people = await People.findById(req.params.id);

  if (!people) return res.status(404).send('The people with the given ID was not found.');

  res.send(people);
});


module.exports = router;