
const express = require('express');
var app = express();
const PASSWORD='D2jt5sgfS3y0mSl0'
const DATABASE='mongodb+srv://aman:<password>@cluster0-ss781.mongodb.net/hackathon?retryWrites=true&w=majority';


const mongoose = require('mongoose');


const bodyParser = require('body-parser');

 const PeopleRoute = require('./Route/PeopleRoute');
 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


const DB=DATABASE.replace('<password>',PASSWORD);
const cors = require('cors');
app.use(cors());

mongoose.connect(DB , {useNewUrlParser : true,useCreateIndex:true,useFindAndModify:false} ).then(con=>{
    console.log('Databse connected successfully');
    console.log(con.connections);

})
.then( () => console.log("Succesful Connected To Database") )
.catch ( (err) => console.error("Do not connect TO Datebase" , err) );


app.use('/api/people' , PeopleRoute  );

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

