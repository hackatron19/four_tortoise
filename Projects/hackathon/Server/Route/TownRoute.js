 
const {Town, validateTown} = require('../Model/Town'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

  console.log("Starting Get Request for Town");
  const towns = await Town.find().sort('name');
  res.send(towns);
});





router.post('/', async (req, res) => {

  //  const { error } = validateTown(req.body); 
  //  if (error) return res.status(400).send(error.details[0].message);

   console.log(req.body);

  let town = new Town({ 
   
    name : req.body.name

    
  });
  town = await town.save();
  
  res.send(town);
});