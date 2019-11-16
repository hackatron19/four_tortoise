 
const {Village, validateVillage} = require('../Model/Village'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

  console.log("Starting Get Request for Village");
  const villages = await Village.find().sort('email');
  res.send(villages);
});





router.post('/', async (req, res) => {

  //  const { error } = validateVillage(req.body); 
  //  if (error) return res.status(400).send(error.details[0].message);

   console.log(req.body);

  let village = new Village({ 
    name: req.body.name,
    dist : req.body.dist,
    retailerList : req.body.retailerList
    
  });
  village = await village.save();
  
  res.send(village);
});